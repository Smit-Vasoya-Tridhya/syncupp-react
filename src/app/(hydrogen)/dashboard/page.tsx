import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';


export const metadata = {
  ...metaObject('Dashboard'),
};


export default function FileDashboardPage() {
  return (
    <>
      <FileDashboard />
    </>
  );
}
