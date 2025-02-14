import { Route, Routes } from 'react-router-dom';
import LoginPage from "@/app/login/page";
import RegisterPage from '@/app/register/page';
import { AuthProvider } from "@/context/AuthContext";
import { PublicRoute } from '@/components/routes/PublicRoute';
import { RequireAuth } from '@/components/routes/RequireAuth';
import HomePage from '@/app/homepage/page';
import { Toaster } from '@/components/ui/toaster';
import { OpenApiAdmin } from "@api-platform/admin";
import ExerciceLibrePage from '@/app/exercice-libre/pages';
import ProfilePage from '@/app/profile/page';
import EditProfilePage from '@/app/profile/edit-profile/page';
import ForgotPasswordPage from '@/app/mail-reset-password/page';
import ResetPasswordPage from '@/app/reset-password/page';
import ConfirmAccountPage from '@/app/confirm-account/page';
import ExercicesFrontPage from './app/exercices-frontpage/page';
import InformationsPage from './app/informations/page';

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

        <Route path="/reset-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/reset/:token" element={<ResetPasswordPage />} />
        <Route path="/account-confirmation/:token" element={<ConfirmAccountPage />} />

        <Route element={<RequireAuth />}>
          <Route path='/exercice-libre' element={<ExerciceLibrePage />} />
          <Route path="/exercices" element={<ExercicesFrontPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/informations" element={<InformationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </AuthProvider >
  );
}

export default App;
