import { useState } from 'react';
import { useCustomers } from '../hooks/use-customers';
import { useDebounce } from '../../../hooks/use-debounce';

/**
 * CustomerList Component
 * 
 * Displays a paginated, searchable list of customers with responsive design.
 * 
 * Data Flow:
 * 1. User types in search → searchTerm state updates
 * 2. searchTerm is debounced (500ms) → debouncedSearch
 * 3. debouncedSearch + page + limit are passed to useCustomers hook
 * 4. Hook detects dependency change → fetches data from API
 * 5. Data updates on screen
 * 
 * Features:
 * - Pagination (previous/next buttons)
 * - Debounced search (avoids excessive API calls)
 * - Responsive design (table on desktop, cards on mobile)
 * - Loading states with skeleton UI
 * - Total records counter
 */
export const CustomerList = () => {
  // Search input state - updates immediately as user types
  const [searchTerm, setSearchTerm] = useState('');
  
  // Current page number - resets to 1 when user searches
  const [page, setPage] = useState(1);
  
  // Records per page (fixed at 10)
  const limit = 10;

  /**
   * Debounced search term that waits 500ms after user stops typing
   * This prevents sending API requests on every keystroke
   */
  const debouncedSearch = useDebounce(searchTerm, 500);

  /**
   * useCustomers Hook - Fetches customer data from API
   * 
   * Returns every time ANY of these dependencies change:
   * - page (user clicks next/previous)
   * - limit (if changed in future)
   * - debouncedSearch (user search input after 500ms delay)
   * 
   * Hook automatically handles:
   * - API calls with correct parameters
   * - Loading state during fetch
   * - Error handling
   * - Placeholder data while loading
   */
  const { data, isLoading, isPlaceholderData } = useCustomers({
    page,
    limit,
    search: debouncedSearch,
  });

  // Extract customer list from response
  const customers = data?.data || [];
  
  // Total number of matching records (used for pagination)
  const totalRecords = data?.meta?.total || 0;
  
  // Calculate last page number
  const lastPage = Math.ceil(totalRecords / limit) || 1;

  return (
    <div className="min-h-screen bg-slate-50 py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search Section */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              CatchOne <span className="text-purple-600">Customers</span>
            </h1>
            {/* Display total records count */}
            <p className="mt-1 text-sm text-slate-500">
              {totalRecords.toLocaleString()} records found
            </p>
          </div>

          {/* Search Input Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full md:w-80 px-4 py-3 pl-10 border border-slate-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => {
                // Update search term (triggers debounce)
                setSearchTerm(e.target.value);
                // Reset to page 1 when searching
                setPage(1);
              }}
            />
            <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
          </div>
        </div>

        {/* Desktop Table View (Hidden on Mobile) */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-purple-700">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Company</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-slate-100 ${isPlaceholderData ? 'opacity-50' : ''}`}>
              {/* Show skeleton loaders while data is loading */}
              {isLoading ? (
                [...Array(limit)].map((_, i) => (
                  <tr key={i} className="animate-pulse"><td colSpan={4} className="px-6 py-6 bg-slate-50/20"></td></tr>
                ))
              ) : (
                /* Render customer rows once data is loaded */
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{c.first_name} {c.last_name}</div>
                      {/* Show email on mobile only */}
                      <div className="text-xs text-slate-400 md:hidden">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 italic">
                        {c.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">{c.company}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View (Hidden on Desktop) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {/* Show skeleton loaders while data is loading */}
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-2xl animate-pulse shadow-sm" />
            ))
          ) : (
            /* Render customer cards once data is loaded */
            customers.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm active:bg-purple-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">{c.first_name} {c.last_name}</h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-1 bg-purple-50 text-purple-600 rounded">
                    ID: {c.id}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-3">{c.email}</p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-50">
                  <span className="italic text-slate-400">{c.title}</span>
                  <span className="font-semibold text-slate-700">{c.company}</span>
                </div>
              </div>
            ))
          )}
          {/* Show "No results" message when there's no data and not loading */}
          {customers.length === 0 && !isLoading && (
            <div className="py-12 text-center text-slate-400">No results found.</div>
          )}
        </div>

        {/* Pagination Section */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Display current page and total pages */}
          <div className="text-sm text-slate-500 text-center sm:text-left order-2 sm:order-1">
            Page <span className="font-bold text-purple-600">{page}</span> of {lastPage}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex gap-3 order-1 sm:order-2">
            {/* Previous button - disabled on first page or while loading */}
            <button
              disabled={page === 1 || isLoading}
              onClick={() => { 
                // Go to previous page and scroll to top
                setPage(p => p - 1); 
                window.scrollTo(0, 0); 
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold border border-slate-200 rounded-xl bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Previous
            </button>
            
            {/* Next button - disabled on last page or while loading */}
            <button
              disabled={page >= lastPage || isLoading}
              onClick={() => { 
                // Go to next page and scroll to top
                setPage(p => p + 1); 
                window.scrollTo(0, 0); 
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold border border-slate-200 rounded-xl bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
