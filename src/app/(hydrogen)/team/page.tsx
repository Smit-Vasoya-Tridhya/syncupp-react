import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ProductsTable from '@/app/(hydrogen)/team/table';
import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ModalButton from '@/app/shared/modal-button';
import AddTeamMemberForm from '@/app/shared/(user)/forms/add-team-member-form';

export const metadata = {
  ...metaObject('Products'),
};

const pageHeader = {
  title: 'Team',
  breadcrumb: [
    // {
    //   href: routes.eCommerce.dashboard,
    //   name: 'E-Commerce',
    // },
    // {
    //   href: routes.eCommerce.products,
    //   name: 'Products',
    // },
    // {
    //   name: 'List',
    // },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          /> */}
          {/* <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          > */}
          <ModalButton
          label="Add Team"
          view={<AddTeamMemberForm />}
          customSize="625px"
          className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
        />
          {/* </Link> */}
        </div>
      </PageHeader>

      <ProductsTable data={productsData} />
    </>
  );
}
