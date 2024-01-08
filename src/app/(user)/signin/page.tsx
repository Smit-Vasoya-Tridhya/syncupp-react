import { metaObject } from '@/config/site.config';
import SignIn from './main-page'

export const metadata = {
  ...metaObject('Signin'),
};

export default function Page() {
  return (
    <SignIn />
  );
}


