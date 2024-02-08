'use client';

import PageHeader from '@/app/shared/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { invoiceColumns } from '@/app/shared/(user)/invoice/invoice-list/column';
import { Button } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { PiPlusBold } from 'react-icons/pi';
import { DeleteInvoice, getAllInvoiceDataTable } from '@/redux/slices/user/invoice/invoiceSlice';

const pageHeader = {
  title: 'Invoice',
};

export default function InvoiceDataTablePage() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const invoiceData = useSelector((state: any) => state?.root?.invoice);

  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
    const response = await dispatch(getAllInvoiceDataTable({ page, items_per_page, sort_field, sort_order, search }));
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await dispatch(getAllInvoiceDataTable({ page, items_per_page, sort_field, sort_order, search }));
      return data?.invoiceList;
    }
    if(data && data?.invoiceList && data?.invoiceList.length !== 0 ) {
      return data?.invoiceList
    }
  };

  const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {
    try {
      const res = await dispatch(DeleteInvoice({ invoiceIdsToDelete: id}));
      if (res.payload.success === true) {
        const reponse = await dispatch(getAllInvoiceDataTable({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <Link href={routes.invoiceForm} className='w-full'>
        <Button
        className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
        >
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Add Invoice</Button>
        </Link>
        </div>
      </PageHeader>
      <CustomTable
        data={invoiceData && invoiceData?.data?.invoiceList}
        total={invoiceData && invoiceData?.data?.page_count}
        loading={invoiceData && invoiceData?.loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleDeleteById={handleDeleteById}
        handleChangePage={handleChangePage}
        getColumns={invoiceColumns}
      />
    </>
  );
}
