import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'

// Create the client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Best practice: don't retry infinitely on failure
      retry: 1,
      // Prevents refetching every time you switch browser tabs
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
