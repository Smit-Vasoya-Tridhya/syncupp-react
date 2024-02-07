import { metaObject } from '@/config/site.config';
import CouponManagementPage from './main-page';

export const metadata = {
  ...metaObject('Coupon-Management'),
};

export default function Page() {
  return (
    <>
      <CouponManagementPage />
    </>
  );
}
