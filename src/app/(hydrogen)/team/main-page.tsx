'use client';

import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import AddTeamMemberForm from '@/app/shared/(user)/team/create-edit/add-team-member-form';
import { deleteTeamMember, getTeamdata } from '@/redux/slices/user/team member/teamSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TeamTable from '@/app/shared/(user)/team/team-list/table';
import toast from 'react-hot-toast';


const pageHeader = {
  title: 'Team',
};


export default function TeamDataTablePage() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const moduleData = useSelector((state: any) => state.root.teamModule);

  useEffect(() => {
    const apiData={
      sortField: 'first_name',
      sortOrder: 'desc',
      page: 1,
      itemsPerPage: pageSize
    }
    dispatch(getTeamdata(apiData))
  },[dispatch, pageSize])
  
  const handleDeleteById = async (_id: string | string[]) => {
    try {
      const res = await dispatch(deleteTeamMember({ _id: [_id] }));
      if (res.payload.status === false ) {
        toast.error(res.payload.message);
      } else {
        // closeModal();
        await dispatch(getTeamdata({ sort_field: 'createdAt', sort_order: 'desc' }));
        toast.success(res.payload.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = async (paginationParams: any) => {
    let { page, sort_order,sort_field,search} = paginationParams;
    await dispatch(getTeamdata({ page, pageSize, sortField: sort_field, sortOrder: sort_order, search }));
    // const { total } = response.payload;
    // const maxPage: number = Math.ceil(total / pageSize);

    // if (page > maxPage) {
    //   page = maxPage > 0 ? maxPage : 1;
    // }
    // // const adjustedResponse = await dispatch(getTeamdata({ page, pageSize, sortOrder }));

    // return response;
  };
  const filterState = {
    status: '',
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ModalButton
          label="Add Team"
          view={<AddTeamMemberForm />}
          customSize="625px"
          className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
        />
        </div>
      </PageHeader>
      <TeamTable
        handleDeleteById={handleDeleteById} 
        handleChangePage={handleChangePage} 
        data={moduleData && moduleData?.data}
      />
    </>
  );
}
