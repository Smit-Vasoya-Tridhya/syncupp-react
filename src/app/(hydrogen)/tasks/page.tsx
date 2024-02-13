
import { metaObject } from '@/config/site.config';
import TaskPage from './main-page';

export const metadata = {
  ...metaObject('Task'),
};

export default function Page() {
  return (
    <>
       <TaskPage />
    </>
  );
}
