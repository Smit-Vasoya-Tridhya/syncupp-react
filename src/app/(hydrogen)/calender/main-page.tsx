'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(user)/calender/calender-list/columns';
import { getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import { Button, Title } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ModalButton from '@/app/shared/modal-button';
import { PiPlusBold } from 'react-icons/pi';
import AddTaskFormPage from '@/app/shared/(user)/calender/create-edit-event/create-edit-activity-form';


export default function CalenderTablePage() {
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
      <div className="">
        <div className='border-b-2 flex gap-2'>
            <Title className='pb-2 mr-3'>Activity</Title>
            <span className='border-x-[1px]'></span>
          <div className='pb-2 ml-3'>
              <Link href={routes.UserCalenderForm}>
                <FaRegCalendarAlt className="h-[30px] w-[30px]" />
              </Link>
            </div>
            <span className='border-x-[1px] ml-3 pb-2'></span>
        </div>
        <div className="flex gap-x-3.5 border-b-2 pb-4">
          <div className="mr-auto mt-4 flex items-center justify-start gap-3 @lg:mt-0">
            <Button className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
              To Do
            </Button>
            <Button
              variant="outline"
              className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
            >
              Overdue
            </Button>
            <Button
              variant="outline"
              className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
            >
              Done
            </Button>
            <Button
              variant="outline"
              className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
            >
              Today
            </Button>
            <Button
              variant="outline"
              className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
            >
              Tomorrow
            </Button>
            <Button
              variant="outline"
              className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
            >
              This Week
            </Button>
            <Button
              variant="outline"
              className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
            >
              Select Period
            </Button>
          </div>
          <div className="mr-auto mt-4 flex items-center gap-3 @lg:mt-0">
            {/* <Link href={routes.UserCalenderAddActivity} className="w-full">
              <Button className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
                Add Activity
              </Button>
            </Link> */}
            <ModalButton
            label="Add Task"
            view={<AddTaskFormPage title="New Task" />}
            customSize="1400px"
            className="mt-0 w-full max-h-[800px] overflow-auto hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
          </div>
        </div>
        <span className='border-y-[1px] ml-3 pb-2'></span>
      </div>
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
