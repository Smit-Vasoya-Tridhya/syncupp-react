
import { metaObject } from '@/config/site.config';
import CalenderTablePage from './main-page';

export const metadata = {
  ...metaObject('Calender'),
};

export default function CalenderPage() {
  return (
    <>
    <CalenderTablePage/>
    </>
  );
}
