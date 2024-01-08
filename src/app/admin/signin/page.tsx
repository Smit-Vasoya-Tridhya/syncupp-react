import { metaObject } from '@/config/site.config';
import SignIn from './main-page'

export const metadata = {
  ...metaObject('Signin - Admin'),
};

export default function Page() {
  return (
    <SignIn />
  );
}



