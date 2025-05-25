import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useBookmarks } from '../../context/bookmarks/useBookmarks';

export default function BookmarkGraph() {
  const { bookmarks } = useBookmarks();

  // Group bookmarks by date and count them
  const groupByDate = (bookmarks) => {
    const grouped = bookmarks.reduce((acc, repo) => {
      const date = new Date(repo.bookmarkedAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Convert to array format needed by Recharts
    return Object.entries(grouped)      .map(([date, count]) => ({ 
        date, 
        count,
        tooltipContent: `${new Date(date).toLocaleDateString()} - ${count} bookmark${count === 1 ? '' : 's'}`
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
  };

  const data = groupByDate(bookmarks);

  // If no data, show a message
  if (data.length === 0) {
    return (
      <div className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-blue-100/50 dark:border-gray-700/50 text-center text-gray-500 dark:text-gray-400 italic">
        No bookmarking activity to display yet.
      </div>
    );
  }

  return (
    <div className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-blue-100/50 dark:border-gray-700/50">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6">Bookmarking Activity</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#F3F4F6',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem' 
              }}
              labelStyle={{ color: '#374151' }}
            />            <Line 
              type="monotone" 
              dataKey="count" 
              name="Bookmarks"
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6, fill: '#2563EB' }}
            />
            <Tooltip
              formatter={(value, name, props) => props.payload.tooltipContent}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
