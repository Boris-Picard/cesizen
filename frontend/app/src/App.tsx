import { Route, Routes } from 'react-router-dom';
import LoginPage from "@/login/page.tsx";
import RegisterPage from '@/register/page.tsx';
import { MailResetPassword } from '@/components/mail-reset-password/mail-reset-password';
import { ResetPassword } from '@/components/reset-password/reset-password';
import { ConfirmAccount } from '@/components/confirm-account/confirm-account';
import { AuthProvider } from "@/context/AuthContext";
import { PublicRoute } from '@/components/routes/PublicRoute';
import { RequireAuth } from '@/components/routes/RequireAuth';
import HomePage from './homepage/page';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/reset-password" element={<MailResetPassword />} />
        <Route path="/reset-password/reset/:token" element={<ResetPassword />} />
        <Route path="/account-confirmation/:token" element={<ConfirmAccount />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
