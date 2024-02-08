import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import { getUserProfile } from '@/redux/slices/user/auth/signinSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


export const metadata = {
  ...metaObject('Dashboard'),
};


export default function FileDashboardPage() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile())
  }, [])

  return (
    <>
      <FileDashboard />
    </>
  );
}
