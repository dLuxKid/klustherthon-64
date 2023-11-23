import { Route, Routes } from "react-router-dom"

import Dashboard from "./pages/dashboard"
import Invoices from "./pages/invoices"
import LandingPage from "./pages/landing-page"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/invoices" element={<Invoices />} />
      </Routes >
    </>
  )
}

export default App
