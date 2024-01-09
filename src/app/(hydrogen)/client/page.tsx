import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ModalButton from '@/app/shared/modal-button';
import AddClientForm from '@/app/shared/(user)/client/create-edit/add-client-form';
import ClientTable from '@/app/shared/(user)/client/client-list/table';

export const metadata = {
  ...metaObject('Client'),
};

const pageHeader = {
  title: 'Client',
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <ModalButton
          label="Add Team"
          view={<AddClientForm />}
          customSize="625px"
          className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
        />
        </div>
      </PageHeader>
      <ClientTable data={productsData} />
    </>
  );
}
