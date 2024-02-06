'use client';

import PageHeader from '@/app/shared/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(user)/invoice/invoice-list/column';
import { getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import { Button } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Invoice',
};

export default function InvoiceDataTablePage() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
    const response = await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search, pagination: true }));
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search, pagination: true }));
      return data?.teamMemberList;
    }
    if(data && data?.teamMemberList && data?.teamMemberList.length !== 0 ) {
      return data?.teamMemberList
    }
  };

  const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {
    // try {
    //   const res = await dispatch(deleteTeamMember({ _id: id }));
    //   if (res.payload.success === true) {
    //     const reponse = await dispatch(getAllTeamMember({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, pagination: true }));
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <Link href={routes.invoiceForm} className='w-full'>
        <Button
        className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
        >Add Invoice</Button>
        </Link>
        </div>
      </PageHeader>
      <CustomTable
        data={teamMemberData && teamMemberData?.data?.teamMemberList}
        total={teamMemberData && teamMemberData?.data?.page_count}
        loading={teamMemberData && teamMemberData?.loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleDeleteById={handleDeleteById}
        handleChangePage={handleChangePage}
        getColumns={getColumns}
      />
    </>
  );
}
