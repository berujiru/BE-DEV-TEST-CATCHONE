import './App.css'
import { Toaster } from './components/Toaster'
import { CustomerList } from './features/customers/components/CustomerList'

function App() {

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <CustomerList />
      <Toaster />
    </main>
  )
}

export default App
