import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useBookmarks } from '../../context/bookmarks/useBookmarks';
import { useAuth } from '../../context/auth/useAuth';
import { batchAddBookmarks } from '../../services/firestore.js';

function CSVImport(props, ref) {
  const { bookmarks } = useBookmarks();
  const { user } = useAuth();
  const inputRef = useRef();
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  // Batch size for async processing
  const BATCH_SIZE = 5;
  const BATCH_DELAY = 800; // ms between batches

  const processBatch = async (lines, startIdx, imported, skipped, existingIds, existingNames) => {
    if (!user) {
      setError('Please login to import bookmarks.');
      setImporting(false);
      return;
    }

    const batch = [];
    let batchImported = 0;
    let batchSkipped = 0;

    for (let i = startIdx; i < Math.min(startIdx + BATCH_SIZE, lines.length); i++) {
      const repoFullName = lines[i];
      if (!repoFullName.includes('/')) {
        batchSkipped++;
        continue;
      }
      if (existingNames.has(repoFullName)) {
        batchSkipped++;
        continue;
      }

      try {
        const response = await fetch(`https://api.github.com/repos/${repoFullName}`);
        const repo = await response.json();

        if (repo.id && !existingIds.has(repo.id.toString())) {
          batch.push(repo);
          batchImported++;
          existingIds.add(repo.id.toString());
          existingNames.add(repo.full_name);
        } else {
          batchSkipped++;
        }
      } catch {
        batchSkipped++;
      }
    }

    // Add batch to Firebase
    if (batch.length > 0) {
      const result = await batchAddBookmarks(user.uid, batch);
      if (!result.success) {
        setError('Failed to import some bookmarks.');
        setImporting(false);
        return;
      }
    }

    const totalImported = imported + batchImported;
    const totalSkipped = skipped + batchSkipped;

    if (startIdx + BATCH_SIZE < lines.length) {
      setSummary(`${totalImported} repos imported, ${totalSkipped} skipped so far...`);
      setTimeout(() => {
        processBatch(lines, startIdx + BATCH_SIZE, totalImported, totalSkipped, existingIds, existingNames);
      }, BATCH_DELAY);
    } else {
      setImporting(false);
      setSummary(`${totalImported} repos imported, ${totalSkipped} skipped due to validation errors or duplicates.`);
      inputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    if (!user) {
      setError('Please login to import bookmarks.');
      return;
    }

    setError('');
    setSummary('');
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : '');
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a .csv file.');
      return;
    }
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const existingIds = new Set(bookmarks.map(b => b.id.toString()));
      const existingNames = new Set(bookmarks.map(b => b.full_name));
      processBatch(lines, 0, 0, 0, existingIds, existingNames);
    };
    reader.onerror = () => {
      setError('Failed to read file.');
      setImporting(false);
    };
    reader.readAsText(file);
  };

  useImperativeHandle(ref, () => ({
    clearSummary: () => {
      setSummary('');
      setSelectedFile('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }), []);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 items-stretch w-full mb-6">
      <label className="font-semibold text-blue-700 dark:text-blue-200 mb-1">Import Bookmarks from CSV</label>
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="csv-upload" className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-gray-800 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-gray-700 transition cursor-pointer bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-lg font-semibold border border-blue-200 dark:border-gray-700 shadow">
          Choose File
          <input
            id="csv-upload"
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={importing}
            className="hidden"
          />
        </label>
        <span className="text-sm text-gray-700 dark:text-gray-200 min-w-0 truncate max-w-[160px]">{selectedFile || "No file chosen"}</span>
      </div>
      {importing && <span className="text-blue-600 dark:text-blue-300 font-medium">Importing...</span>}
      {summary && <span className="text-green-700 dark:text-green-400 font-medium">{summary}</span>}
      {error && <span className="text-red-600 dark:text-red-400 font-medium">{error}</span>}
    </div>
  );
}

export default forwardRef(CSVImport);
