import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import SideNavbar from "./components/side-navbar"

import { Toaster } from "sonner"

import Customers from "./pages/customers"
import Dashboard from "./pages/dashboard"
import Invoices from "./pages/invoices"
import LandingPage from "./pages/landing-page"
import Login from "./pages/login"
import Payments from "./pages/payments"
import Signup from "./pages/signup"

import { useAuthContext } from "./context/useAuthContext"
import Staffs from "./pages/manage-staffs"
import { useEffect } from "react"

function App() {
  const { user, authIsReady, dispatch } = useAuthContext()

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: "login", payload: JSON.parse(storedUser) });
    } else {
      dispatch({ type: "auth-is-ready", payload: null });
    }
  }, []);

  if (!authIsReady) return null

  return (
    <>
      <Toaster richColors position="top-right" duration={5000} />
      <Routes>
        {/* unauthenticated routes */}
        <Route element={user?.id ? <Navigate to='/dashboard' /> : <Outlet />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* authenticated routes */}
        <Route path="/dashboard" element={
          user?.id ?
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full">
              <div className="w-full flex-none md:w-64">
                <SideNavbar />
              </div>
              <div className="flex-grow p-6 pl-14 md:overflow-y-auto md:p-12">
                <Outlet />
              </div>
            </div>
            : <Navigate to='/login' />
        }>
          <Route path="" element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="clients" element={<Customers />} />
          <Route path="payments" element={<Payments />} />
          <Route path='staffs' element={<Staffs />} />
        </Route>
      </Routes >
    </>
  )
}

export default App
