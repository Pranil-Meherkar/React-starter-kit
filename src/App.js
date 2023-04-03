import { Route, Routes } from 'react-router'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MainHeader from './components/layout/MainHeader'
import Dashboard from './components/pages/Dashboard'
import Error from './components/pages/ErrorPage/Error'
import ProtectedRoutes from './routes/ProtectedRoutes'
import TestPage from './components/pages/TestPage'



const App = () => {
  const font = "'Poppins', sans-serif";
  const theme = createTheme({
    typography: {
      fontFamily: font
    }
  })

  return (
    <GoogleOAuthProvider clientId="247734515468-1caral148vs24evoub2at4hb7ncugtb4.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <div>
          <Routes>
            
            <Route path='/' element={<MainHeader />}>
              <Route path='/dashboard' element={<ProtectedRoutes Component={Dashboard}/>}/>
              <Route path='/test' element={<TestPage/>}/>
              <Route path='*' element={<Error />} />
              
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
