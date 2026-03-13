import React, { useState } from 'react';
import { useCustomers } from '../hooks/use-customers';
import { useDebounce } from '../../../hooks/use-debounce';

export const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isPlaceholderData } = useCustomers({
    page,
    limit,
    search: debouncedSearch,
  });

  // Aligning with your schema: data.data and data.total
  const customers = data?.data || [];
  const totalRecords = data?.total || 0;
  
  // Calculate pagination manually since it's not in the JSON 'meta'
  const lastPage = Math.ceil(totalRecords / limit) || 1;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 text-purple-600">CatchOne Customers</h1>
        
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); 
          }}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-purple-700">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase">Name</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase">Email</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase">Title</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase">Company</th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-100 ${isPlaceholderData ? 'opacity-50' : ''}`}>
            {isLoading ? (
              [...Array(limit)].map((_, i) => (
                <tr key={i} className="animate-pulse"><td colSpan={4} className="px-6 py-6 bg-gray-50/50"></td></tr>
              ))
            ) : customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{c.first_name} {c.last_name}</td>
                  <td className="px-6 py-4 text-gray-600">{c.email}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm italic">{c.title}</td>
                  <td className="px-6 py-4 text-gray-600">{c.company}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No results found.</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination logic using our calculated lastPage */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page <span className="font-bold text-purple-600">{page}</span> of {lastPage} 
            <span className="ml-2 text-xs text-gray-400">({totalRecords} total records)</span>
          </div>
          <div className="flex gap-2">
            <button
              disabled={page === 1 || isLoading}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-30"
            >
              Previous
            </button>
            <button
              disabled={page >= lastPage || isLoading}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};