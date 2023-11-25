import { Outlet, Route, Routes } from "react-router-dom"

import SideNavbar from "./components/side-navbar"

import { Toaster } from "sonner"

import Customers from "./pages/customers"
import Dashboard from "./pages/dashboard"
import Invoices from "./pages/invoices"
import LandingPage from "./pages/landing-page"
import Login from "./pages/login"
import Payments from "./pages/payments"
import Signup from "./pages/signup"

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        {/* unauthenticated routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* authenticated routes */}
        <Route path="/dashboard" element={
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNavbar />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              <Outlet />
            </div>
          </div>
        }>
          <Route path="" element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="customers" element={<Customers />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes >
    </>
  )
}

export default App
