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
import { OpenApiAdmin } from "@api-platform/admin";
import ExerciceLibrePage from './app/exercice-libre/pages';

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route>
          {/* <Route element={<AdminRoute />}> */}
          <Route path="/*" element={
            <OpenApiAdmin docEntrypoint='http://cesizen-api.localhost/api/docs' entrypoint='http://cesizen-api.localhost/api' />
          } />
          {/* </Route> */}
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/reset-password" element={<MailResetPassword />} />
        <Route path="/reset-password/reset/:token" element={<ResetPassword />} />
        <Route path="/account-confirmation/:token" element={<ConfirmAccount />} />

        <Route element={<RequireAuth />}>
          <Route path='/exercice-libre' element={<ExerciceLibrePage />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </AuthProvider >
  );
}

export default App;
