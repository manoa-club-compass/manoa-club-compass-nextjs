import { auth } from '@/lib/auth';
import { adminProtectedPage } from '@/lib/page-protection';
import AdminDashboardScreen from '@/components/AdminDashboardScreen';

const AdminDashboardPage = async () => {
  const session = await auth();
  adminProtectedPage(session);
  return <AdminDashboardScreen />;
};

export default AdminDashboardPage;
