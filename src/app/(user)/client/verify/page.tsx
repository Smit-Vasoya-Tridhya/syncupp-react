import { metaObject } from '@/config/site.config';
import MainPage from './main-page';

export const metadata = {
  ...metaObject('SetPassword - Client'),
};

export default function Page() {
  return (
    <MainPage />
  );
}