import { metaObject } from '@/config/site.config';
import SignUpPage from './main-page'

export const metadata = {
  ...metaObject('Signup'),
};

export default function Page() {

  return (
    <>
      <SignUpPage />
    </>
  );
}