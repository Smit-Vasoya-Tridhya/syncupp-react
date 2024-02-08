
import { metaObject } from '@/config/site.config';
import CalenderTablePage from './main-page';

export const metadata = {
  ...metaObject('Calendar'),
};

export default function CalenderPage() {
  return (
    <>
    <CalenderTablePage/>
    </>
  );
}
