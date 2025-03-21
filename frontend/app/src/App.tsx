import { Route, Routes } from 'react-router-dom';
import LoginPage from "@/app/login/page";
import RegisterPage from '@/app/register/page';
import { AuthProvider } from "@/context/AuthContext";
import { PublicRoute } from '@/routes/PublicRoute';
import { RequireAuth } from '@/routes/RequireAuth';
import HomePage from '@/app/homepage/page';
import { Toaster } from '@/components/ui/toaster';
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
import RolesPage from './app/admin-dashboard/roles/page';
import ExercicesPage from './app/admin-dashboard/exercices/page';
import { InformationsAdminPage } from './app/admin-dashboard/informations/page';
import TypeInformationsPage from './app/admin-dashboard/type-informations/page';
import TypeInteractionsPage from './app/admin-dashboard/type-interactions/page';
import { TypeHistoriquesComponents } from './components/admin-dashboard/type-historiques/type-historiques';
import ExercicesDetailPage from './app/exercices/exercices-detail-page/page';
import { InteractionsPage } from './app/admin-dashboard/interactions/page';
import { InformationsDetailPage } from './app/informations/informations-detail-page/informations-detail-page';
import { ConditionsPage } from './app/conditions/page';
import { PrivacyPage } from './app/privacy/page';
import { HistoriquesAdminPage } from './app/admin-dashboard/historiques/page';
import ValidationPage from './app/admin-dashboard/validations/page';

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
            <Route path="/admin/content/informations" element={<InformationsAdminPage />} />
            <Route path="/admin/content/exercices" element={<ExercicesPage />} />
            <Route path="/admin/types/informations" element={<TypeInformationsPage />} />
            <Route path="/admin/types/interactions" element={<TypeInteractionsPage />} />
            <Route path="/admin/types/historiques" element={<TypeHistoriquesComponents />} />
            <Route path="/admin/interactions" element={<InteractionsPage />} />
            <Route path="/admin/historiques" element={<HistoriquesAdminPage />} />
            <Route path="/admin/validation" element={<ValidationPage />} />
          </Route>
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/reset/:token" element={<ResetPasswordPage />} />
          <Route path="/account-confirmation/:token" element={<ConfirmAccountPage />} />
        </Route>

        <Route path="/conditions" element={<ConditionsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/informations" element={<InformationsPage />} />
        <Route path="/informations/:id" element={<InformationsDetailPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/exercices" element={<ExercicesFrontPage />} />
          <Route path="/exercices/:id" element={<ExercicesDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </AuthProvider >
  );
}

export default App;
