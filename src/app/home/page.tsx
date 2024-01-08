'use client';
import HomePage from '@/app/shared/home-page';

import { metaObject } from '@/config/site.config';

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
