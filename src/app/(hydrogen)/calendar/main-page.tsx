"use client";
// import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { PiListBullets, PiPlusBold } from 'react-icons/pi';
import { ActionIcon, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { setGridView } from '@/redux/slices/user/task/taskSlice';
import AddActivityFormPage from '@/app/shared/(user)/calender/create-edit-event/create-edit-activity-form';
import EventCalendarView from '@/app/shared/(user)/calender/event-calendar';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ActivitySelectionForm from '@/app/shared/(user)/forms/activity-selection-form';
import ActivityTablePage from './activity-table';

const pageHeader = {
  title: 'Activity',
};

export default function CalendarMainPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const signIn = useSelector((state: any) => state?.root?.signIn)
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const taskData = useSelector((state: any) => state?.root?.task);
  const activityData = useSelector((state: any) => state?.root?.activity);
  const { gridView } = useSelector((state: any) => state?.root?.task);

  console.log("Activity is....", activityData?.activityName)


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
              view={<AddActivityFormPage title="New Activity" isTaskModule={false} />}
              customSize="1050px"
              className="mt-0 w-full max-h-[800px] overflow-auto hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
              icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
            />
          }
        </div>
      </PageHeader>

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
          <FaRegCalendarAlt
            className={cn(
              'h-5 w-5 transition-colors group-hover:text-gray-900',
              gridView && 'text-white'
            )}
          />
        </ActionIcon>
      </div>
      {!gridView ? (
        <div className='mt-4'>
          <div className="ms-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 xl:grid-cols-9 gap-3">
            <Button variant="outline" className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
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
            <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0'>
              <ActivitySelectionForm />
            </div>
            <div className='mt-5 w-full bg-none text-xs grid col-span-6
             @lg:w-auto sm:text-sm lg:mt-0'>
              <ActivitySelectionForm />
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-4'>
          <div className="ms-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 gap-3">
            <Button variant="outline" className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
              Select Period
            </Button>
          </div>
        </div>
      )
      }
      {!gridView ? (
        <div className='mt-8'>
          <ActivityTablePage />
        </div>
      ) : (
        <div className='mt-12'>
          <EventCalendarView />
        </div>
      )
      }
    </>
  );
}

