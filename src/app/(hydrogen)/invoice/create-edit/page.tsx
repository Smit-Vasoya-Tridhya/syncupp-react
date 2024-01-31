import { metaObject } from '@/config/site.config';
import AddInvoiceForm from './add-edit-invoice-form';

export const metadata = {
  ...metaObject('Invoice'),
};

export default function Page() {
  return (
    <>
    <AddInvoiceForm/>
    </>
  );
}
