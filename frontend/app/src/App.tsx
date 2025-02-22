import { Route, Routes } from 'react-router-dom';
import LoginPage from "@/app/login/page";
import RegisterPage from '@/app/register/page';
import { AuthProvider } from "@/context/AuthContext";
import { PublicRoute } from '@/routes/PublicRoute';
import { RequireAuth } from '@/routes/RequireAuth';
import HomePage from '@/app/homepage/page';
import { Toaster } from '@/components/ui/toaster';
import ExerciceLibrePage from '@/app/exercices/exercice-libre/pages';
import ProfilePage from '@/app/profile/page';
import EditProfilePage from '@/app/profile/edit-profile/page';
import ForgotPasswordPage from '@/app/mail-reset-password/page';
import ResetPasswordPage from '@/app/reset-password/page';
import ConfirmAccountPage from '@/app/confirm-account/page';
import ExercicesFrontPage from '@/app/exercices/page';
import InformationsPage from '@/app/informations/page';
import AdminPage from '@/app/admin-dashboard/page';
import { AdminRoute } from '@/routes/AdminRoute';
import UsersPage from '@/app/admin-dashboard/users/page';
// import ArticlesPage from '@/app/admin-dashboard/articles/page';
import RolesPage from './app/admin-dashboard/roles/page';
import ExercicesPage from './app/admin-dashboard/exercices/page';

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/users/roles" element={<RolesPage />} />
            {/* <Route path="/admin/articles" element={<ArticlesPage />} /> */}
            <Route path="/admin/content/exercices" element={<ExercicesPage />} />
          </Route>
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
