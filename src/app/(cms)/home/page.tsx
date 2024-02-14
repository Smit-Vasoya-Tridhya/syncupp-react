import HomePage from '@/app/(cms)/home/home-page';

import { metaObject } from '@/config/site.config';
import Header from '@/layouts/helium/helium-header';

export const metadata = {
  ...metaObject('Home'),
};

export default function BlankPage() {
  return (
    <>
   
      <HomePage />
    </>
  );
}
