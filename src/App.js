import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MainHeader from './components/layout/MainHeader'
import Error from './components/pages/ErrorPage/Error'
import TestPage from './components/pages/TestPage'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Spinner from './components/shared/Spinner/Spinner';

const Dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"))
const Roles = lazy(() => import("./components/pages/roles/Roles"))
const HomeLayout = lazy(() => import("./components/layout/HomeLayout"))
const Permissions = lazy(() => import("./components/pages/permissions/Permissions"))
const Profiles = lazy(() => import("./components/pages/profiles/Profiles"))
const Settings = lazy(() => import("./components/pages/settings/Settings"))
const BulkUpload = lazy(() => import("./components/pages/bulkupload/BulkUpload"))
const Products = lazy(() => import("./components/pages/products/Products"))


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
          <Suspense fallback={<Spinner/>}>
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
                <Route path='*' element={<Error />} />
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
