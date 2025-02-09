import { Route, Routes } from 'react-router-dom'
import './index.css'
import LoginPage from "@/login/page.tsx"
import RegisterPage from '@/register/page.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
