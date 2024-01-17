import { metaObject } from '@/config/site.config';
import MainPage from './main-page';

export const metadata = {
  ...metaObject('SetPassword - Team member'),
};

export default function Page() {
  return (
    <MainPage />
  );
}