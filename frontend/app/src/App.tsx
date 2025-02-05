import { Route, Routes } from 'react-router-dom'
import './index.css'
import LoginPage from "./login/page.tsx"
import RegisterPage from './register/page.tsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
