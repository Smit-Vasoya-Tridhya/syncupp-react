'use client';

import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import AddTeamMemberForm from '@/app/shared/(user)/agency/agency-team/create-edit/add-team-member-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(user)/agency/agency-team/team-list/columns';
import { deleteTeamMember, getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import { PiPlusBold } from 'react-icons/pi';


const pageHeader = {
  title: 'Agency Team',
};


export default function TeamDataTablePage() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  // const clientSliceData = useSelector((state: any) => state?.root?.client);

  
  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;

    const response = await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search }));
    // console.log(response, "Response.....")
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await dispatch(getAllTeamMember({ page, items_per_page, sort_field, sort_order, search }));
      return data?.teamMemberList;
    }
    if(data && data?.teamMemberList && data?.teamMemberList.length !== 0 ) {
      return data?.teamMemberList
    }
  };

  const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {

    try {
      const res = await dispatch(deleteTeamMember({ teamMemberIds: id }));
      if (res.payload.success === true) {
        const reponse = await dispatch(getAllTeamMember({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm }));
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ModalButton
          label="Add Team Member"
          view={<AddTeamMemberForm title="New Team Member" />}
          customSize="625px"
          className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
          icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
        />
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