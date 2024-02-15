"use client";
// import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, getAllClient } from '@/redux/slices/user/client/clientSlice';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { GetColumns } from '@/app/shared/(user)/task/task-list/columns';
import CustomTable from '@/components/common-tables/table';
import { PiGridFour, PiListBullets, PiPlusBold } from 'react-icons/pi';
import { ActionIcon, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { deleteTask, getAllTask, setGridView } from '@/redux/slices/user/task/taskSlice';
import KanbanBoard from '@/app/shared/(user)/task/task-grid/kanban-board';
import AddActivityFormPage from '@/app/shared/(user)/calender/create-edit-event/create-edit-activity-form';

const pageHeader = {
  title: 'Activity',
};

export default function TaskPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { closeModal } = useModal();
  const signIn = useSelector((state: any) => state?.root?.signIn)
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const taskData = useSelector((state: any) => state?.root?.task);
  const { gridView } = useSelector((state: any) => state?.root?.task);

  // console.log("Grid view....", gridView)

  const [pageSize, setPageSize] = useState<number>(5);


  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;

    const response = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllTask({ page, items_per_page, sort_field, sort_order, search, pagination: true })) : await dispatch(getAllTask({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId, pagination: true }));
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      // await dispatch(getAllTask({ page, items_per_page, sort_field, sort_order, search, pagination: true }));
      signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllTask({ page, items_per_page, sort_field, sort_order, search, pagination: true })) : await dispatch(getAllTask({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId, pagination: true }));
      return data?.client
    }
    if (data && data?.client && data?.client?.length !== 0) {
      return data?.client
    }
  };

  const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {

    // console.log("delete id in main page....", id)

    try {
      const res = await dispatch(deleteTask({ taskIdsToDelete: id }));
      if (res.payload.success === true) {
        closeModal();
        const reponse = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllTask({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, pagination: true })) : await dispatch(getAllTask({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, agency_id: clientSliceData?.agencyId, pagination: true }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleListView = () => {
    dispatch(setGridView(false));
  }

  const handleGridView = () => {
    dispatch(setGridView(true));
  }



  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {(signIn?.role !== 'client' && signIn?.role !== 'team_client') &&
            <ModalButton
              label="Add Activity"
              view={<AddActivityFormPage title="New Activity" />}
              customSize="1050px"
              className="mt-0 w-full max-h-[800px] overflow-auto hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
              icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
            />
          }
        </div>
      </PageHeader>

      <div>
        <div className="ms-auto mt-4 grid grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 gap-3">
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
        <div className="flex justify-end items-center gap-2 w-fit ms-auto rounded-lg border border-gray-200 p-1.5 px-1.5">
          <ActionIcon
            size="sm"
            variant="flat"
            className={cn(
              'group bg-transparent hover:enabled:bg-gray-100 dark:hover:enabled:bg-gray-200',
              !gridView && 'bg-gray-900 dark:bg-gray-200'
            )}
            onClick={handleListView}
          >
            <PiListBullets
              className={cn(
                'h-5 w-5 transition-colors group-hover:text-gray-900',
                !gridView && 'text-white'
              )}
            />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="flat"
            className={cn(
              'group bg-transparent hover:enabled:bg-gray-100  dark:hover:enabled:bg-gray-200',
              gridView && 'bg-gray-900 dark:bg-gray-200'
            )}
            onClick={handleGridView}
          >
            <PiGridFour
              className={cn(
                'h-5 w-5 transition-colors group-hover:text-gray-900',
                gridView && 'text-white'
              )}
            />
          </ActionIcon>
        </div>
      </div>
      {!gridView ? (
        <div>
          <CustomTable
            data={taskData && taskData?.data?.activity}
            total={taskData && taskData?.data?.page_count}
            loading={taskData && taskData?.loading}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleDeleteById={handleDeleteById}
            handleChangePage={handleChangePage}
            getColumns={GetColumns}
          />
        </div>
      ) : (
        <KanbanBoard />
      )
      }
    </>
  );
}


// return (
//   <>
//     <div className="">
//       <div className='border-b-2 flex gap-2'>
//           <Title className='pb-2 mr-3'>Activity</Title>
//           <span className='border-x-[1px]'></span>
//         <div className='pb-2 ml-3'>
//             <Link href={routes.userCalendarForm}>
//               <FaRegCalendarAlt className="h-[30px] w-[30px]" />
//             </Link>
//           </div>
//           <span className='border-x-[1px] ml-3 pb-2'></span>
//       </div>
//       <div className="flex gap-x-3.5 border-b-2 pb-4">
//         <div className="mr-auto mt-4 flex items-center justify-start gap-3 @lg:mt-0">
//           <Button className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
//             To Do
//           </Button>
//           <Button
//             variant="outline"
//             className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
//           >
//             Overdue
//           </Button>
//           <Button
//             variant="outline"
//             className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
//           >
//             Done
//           </Button>
//           <Button
//             variant="outline"
//             className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
//           >
//             Today
//           </Button>
//           <Button
//             variant="outline"
//             className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
//           >
//             Tomorrow
//           </Button>
//           <Button
//             variant="outline"
//             className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
//           >
//             This Week
//           </Button>
//           <Button
//             variant="outline"
//             className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
//           >
//             Select Period
//           </Button>
//         </div>
//         <div className="mr-auto mt-4 flex items-center gap-3 @lg:mt-0">
//           {/* <Link href={routes.userCalendarAddActivity} className="w-full">
//             <Button className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
//               Add Activity
//             </Button>
//           </Link> */}
//           <ModalButton
//           label="Add Activity"
//           view={<AddActivityFormPage title="New Activity" />}
//           customSize="1050px"
//           className="mt-0 w-full max-h-[800px] overflow-auto hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
//           icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
//         />
//         </div>
//       </div>
//       <span className='border-y-[1px] ml-3 pb-2'></span>
//     </div>
//     <CustomTable
//       data={teamMemberData && teamMemberData?.data?.teamMemberList}
//       total={teamMemberData && teamMemberData?.data?.page_count}
//       loading={teamMemberData && teamMemberData?.loading}
//       pageSize={pageSize}
//       setPageSize={setPageSize}
//       handleDeleteById={handleDeleteById}
//       handleChangePage={handleChangePage}
//       getColumns={getColumns}
//     />
//   </>
// );

