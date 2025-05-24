import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Transaction from './pages/Transaction.jsx'

const App = () => {
  return (
    <div>
      <h1>xTracker</h1>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tracker" element={<Transaction />} />
      </Routes>
    </div>
  )
}

export default App
