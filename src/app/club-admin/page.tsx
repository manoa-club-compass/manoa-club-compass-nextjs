import { auth } from '@/lib/auth';
import { clubAdminProtectedPage } from '@/lib/page-protection';
import ClubAdminScreen from '@/components/ClubAdminScreen';

const ClubAdminPage = async () => {
  const session = await auth();
  clubAdminProtectedPage(session);
  return <ClubAdminScreen />;
};

export default ClubAdminPage;
