'use client';

import PageHeader from '@/app/shared/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(user)/agency/client-team/team-list/columns';
import { deleteTeamMember, getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import ClientSelectionForm from '@/app/shared/(user)/forms/client-selection-form';
import Spinner from '@/components/ui/spinner';

const pageHeader = {
  title: 'Client Team',
};

export default function TeamDataTablePage() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  const clientSliceData = useSelector((state: any) => state?.root?.client);

  // console.log("client data.....", clientSliceData?.data)
  // console.log("client list data.....", clientSliceData?.clientList)

  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
    const response = await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search, client_id: clientSliceData?.clientId }));
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search, client_id: clientSliceData?.clientId }));
      return data?.teamMemberList;
    }
    if (data && data?.teamMemberList && data?.teamMemberList.length !== 0) {
      return data?.teamMemberList
    }
  };

  const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {
    try {
      const res = await dispatch(deleteTeamMember({ teamMemberIds: id, client_id: clientSliceData?.clientId }));
      if (res.payload.success === true) {
        const reponse = await dispatch(getAllTeamMember({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, client_id: clientSliceData?.clientId }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ClientSelectionForm />
        </div>
      </PageHeader>
      {clientSliceData && clientSliceData?.clientList?.length === 0 ? (
        <div className='p-10 flex items-center justify-center'>
          <Spinner size="xl" tag='div' className='ms-3' />
        </div>
      ) : (
        <div className='mt-5'>
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
        </div>
        )
      }
    </>
  );
}
