import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import { Toaster } from "sonner"

import SideNavbar from "./components/side-navbar"

import Customers from "./pages/clients"
import Dashboard from "./pages/dashboard"
import Invoices from "./pages/invoices"
import LandingPage from "./pages/landing-page"
import Login from "./pages/login"
import Payments from "./pages/payments"
import Signup from "./pages/signup"
import ManageStaffs from "./pages/manage-staffs"

import { useAuthContext } from "./context/useAuthContext"

function App() {
  const { user, authIsReady } = useAuthContext()

  if (!authIsReady) return null

  return (
    <>
      <Toaster richColors position="top-right" duration={5000} />
      <Routes>
        {/* unauthenticated routes */}
        <Route element={user?.id ? <Navigate to='/dashboard' /> : <Outlet />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* authenticated routes */}
        <Route
          path="/dashboard"
          element={
            user?.id ? (
              <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full">
                <div className="w-full flex-none md:w-64">
                  <SideNavbar />
                </div>
                <div className="flex-grow p-6 pl-14 md:overflow-y-auto md:p-12">
                  <Outlet />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )}
        >
          <Route index element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="clients" element={<Customers />} />
          <Route path="payments" element={<Payments />} />
          <Route path="manage-staffs" element={<ManageStaffs />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  )
}

export default App
