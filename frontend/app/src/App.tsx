import { Route, Routes } from 'react-router-dom';
import LoginPage from "@/app/login/page";
import RegisterPage from '@/app/register/page';
import { MailResetPassword } from '@/components/mail-reset-password/mail-reset-password';
import { ResetPassword } from '@/components/reset-password/reset-password';
import { ConfirmAccount } from '@/components/confirm-account/confirm-account';
import { AuthProvider } from "@/context/AuthContext";
import { PublicRoute } from '@/components/routes/PublicRoute';
import { RequireAuth } from '@/components/routes/RequireAuth';
import HomePage from '@/app/homepage/page';
import { Toaster } from '@/components/ui/toaster';
import { HydraAdmin } from '@api-platform/admin';

function App() {
  return (
    <AuthProvider>
      <Toaster />
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
        <Route
          path="/admin/*"
          element={
            <HydraAdmin entrypoint="http://cesizen-api.localhost/api" basename='/admin' />
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
