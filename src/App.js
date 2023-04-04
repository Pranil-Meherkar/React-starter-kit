import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MainHeader from './components/layout/MainHeader'
import Dashboard from './components/pages/dashboard/Dashboard'
import Error from './components/pages/ErrorPage/Error'
import ProtectedRoutes from './routes/ProtectedRoutes'
import TestPage from './components/pages/TestPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/shared/Loader';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';



// const Login = lazy(() => import("./components/login/Login"))
// // const Dashboard = lazy(() => import("./pages/Dashboard"))
// const Roles = lazy(() => import("./components/pages/roles/Roles"))
// const HomeLayout = lazy(() => import("./layouts/HomeLayout"))
// const Permissions = lazy(() => import("./components/pages/permissions/Permissions"))
// const Profiles = lazy(() => import("./components/pages/profiles/Profiles"))
// const Settings = lazy(() => import("./components/pages/settings/Settings"))
// const BulkUpload = lazy(() => import("./components/pages/bulkupload/BulkUpload"))
import HomeLayout from './components/layout/HomeLayout';
import Permissions from './components/pages/permissions/Permissions';
import Roles from './components/pages/roles/Roles';
import Profiles from './components/pages/profiles/Profiles';
import Settings from './components/pages/settings/Settings';
import BulkUpload from './components/pages/bulkupload/BulkUpload';
import Products from "./components/pages/products/Products"


const App = () => {
  const font = "'Poppins', sans-serif";
  const theme = createTheme({
    typography: {
      fontFamily: font
    }
  })
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, []);

  return (
    <GoogleOAuthProvider clientId="247734515468-1caral148vs24evoub2at4hb7ncugtb4.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <div>


          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                element={<HomeLayout setToken={setToken} />}
              >
                {/* Private Routes */}
                <Route path="/dashboard" element={<PrivateRoute token={token} component={Dashboard} />} />
                <Route path="/roles" element={<PrivateRoute token={token} component={Roles} />} />
                <Route path="/permissions" element={<PrivateRoute token={token} component={Permissions} />} />
                <Route path="/profiles" element={<PrivateRoute token={token} component={Profiles} />} />
                <Route path="/settings" element={<PrivateRoute token={token} component={Settings} />} />
                <Route path="/bulk-upload" element={<PrivateRoute token={token} component={BulkUpload} />} />
                <Route path="/products" element={<PrivateRoute token={token} component={Products} />} />
              </Route>
              {/* <Route> */}
              {/* Public Routes */}
              {/* <Route path="/" element={<PublicRoute token={token} setToken={setToken} component={Login} />} />
              </Route> */}
              <Route path='/' element={<PublicRoute token={token} setToken={setToken} component={MainHeader} />}>
                {/* <Route path='/dashboard' element={<ProtectedRoutes Component={Dashboard} />} /> */}
                <Route path='/test' element={<TestPage />} />

                <Route path='*' element={<Error />} />
              </Route>
            </Routes>
          </Suspense>
          {/* <Routes>
         
            
          </Routes> */}
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
