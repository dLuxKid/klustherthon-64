import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/landing-page"
import Dashboard from "./pages/dashboard"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
