import { metaObject } from '@/config/site.config';
import InvoiceDetails from './invoice-details';

export const metadata = {
  ...metaObject('Invoice'),
};

export default function Page() {
  return (
    <>
    <InvoiceDetails/>
    </>
  );
}
