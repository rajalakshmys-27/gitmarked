import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useBookmarks } from '../../context/bookmarks/useBookmarks';

function CSVImport(props, ref) {
  const { bookmarks, addBookmark } = useBookmarks();
  const inputRef = useRef();
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');

  // Batch size for async processing
  const BATCH_SIZE = 5;
  const BATCH_DELAY = 800; // ms between batches

  const processBatch = async (lines, startIdx, imported, skipped, existingIds, existingNames) => {
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
        const res = await fetch(`https://api.github.com/repos/${repoFullName}`);
        if (res.status === 200) {
          const repo = await res.json();
          if (!existingIds.has(repo.id)) {
            addBookmark(repo);
            existingIds.add(repo.id);
            existingNames.add(repo.full_name);
            batchImported++;
          } else {
            batchSkipped++;
          }
        } else {
          batchSkipped++;
        }
      } catch {
        batchSkipped++;
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
    setError('');
    setSummary(''); // Clear previous summary when a new file is selected
    const file = e.target.files[0];
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
      const existingIds = new Set(bookmarks.map(b => b.id));
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
    clearSummary: () => setSummary('')
  }), []);

  return (
    <div className="flex flex-col gap-2 items-start">
      <label className="font-semibold">Import Bookmarks from CSV</label>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={importing}
        className="block text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {importing && <span className="text-blue-600">Importing...</span>}
      {summary && <span className="text-green-700">{summary}</span>}
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}

export default forwardRef(CSVImport);
