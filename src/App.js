import './App.css'
import Navbar from './components/Navbar/Navbar'
import { ThemeProvider, createTheme } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () => {
  const font ="'Poppins', sans-serif";
  const theme = createTheme({
    typography:{
      fontFamily:font
    }
  })

  return (
    <GoogleOAuthProvider clientId="247734515468-1caral148vs24evoub2at4hb7ncugtb4.apps.googleusercontent.com">
    <ThemeProvider theme={theme}>
    <div>
      <Navbar />
    </div>
    </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
