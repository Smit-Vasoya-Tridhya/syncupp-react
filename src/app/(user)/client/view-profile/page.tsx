import { metaObject } from '@/config/site.config';
import ClientViewProfileForm from './client-view-profile-form';

export const metadata = {
  ...metaObject('Client'),
};

export default function Page() {
  return (
    <ClientViewProfileForm />
  );
}