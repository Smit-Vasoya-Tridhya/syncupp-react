"use client";
// import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { PiListBullets, PiPlusBold } from 'react-icons/pi';
import { ActionIcon, Button } from 'rizzui';
import cn from '@/utils/class-names';
import AddActivityFormPage from '@/app/shared/(user)/calender/create-edit-event/create-edit-activity-form';
import EventCalendarView from '@/app/shared/(user)/calender/event-calendar';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ActivitySelectionForm from '@/app/shared/(user)/forms/activity-selection-form';
import ActivityTablePage from './activity-table';
import { useState } from 'react';
import { getAllActivity, setCalendarView } from '@/redux/slices/user/activity/activitySlice';
import DatePeriodSelectionForm from '@/app/shared/(user)/forms/select-period-form';

const pageHeader = {
  title: 'Activity',
};

export default function CalendarMainPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const signIn = useSelector((state: any) => state?.root?.signIn)
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const taskData = useSelector((state: any) => state?.root?.task);
  const { calendarView } = useSelector((state: any) => state?.root?.activity);

  const [activityType, setActivityType] = useState('');
  const [statusType, setStatusType] = useState('');
  const [period, setPeriod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // console.log("Activity is....", activityData?.activityName)
  // console.log("Activity is....", activityType)
  // console.log("Start date is....", startDate)
  // console.log("End date is....", endDate)

  const handleStatusFilterApiCall = (filterStatusValue: string) => {
    setStatusType(filterStatusValue);
    if(activityType === '' && endDate === '' && startDate === '') {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', filter: { status: filterStatusValue } }))
    } else if(endDate === '' && startDate === '' && activityType !== '') {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', filter: { status: filterStatusValue, activity_type: activityType } }))
    } else if(endDate !== '' && startDate !== '' && activityType !== '') {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', filter: { status: filterStatusValue, activity_type: activityType, date: period, start_date: startDate, end_date: endDate } }))
    } else if(endDate !== '' && startDate !== '' && activityType === '') {
      dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', filter: { status: filterStatusValue, date: period, start_date: startDate, end_date: endDate } }))
    }
  }


  const handleListView = () => {
    dispatch(setCalendarView(false));
  }

  const handleGridView = () => {
    dispatch(setCalendarView(true));
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
            !calendarView && 'bg-gray-900 dark:bg-gray-200'
          )}
          onClick={handleListView}
        >
          <PiListBullets
            className={cn(
              'h-5 w-5 transition-colors group-hover:text-gray-900',
              !calendarView && 'text-white'
            )}
          />
        </ActionIcon>
        <ActionIcon
          size="sm"
          variant="flat"
          className={cn(
            'group bg-transparent hover:enabled:bg-gray-100  dark:hover:enabled:bg-gray-200',
            calendarView && 'bg-gray-900 dark:bg-gray-200'
          )}
          onClick={handleGridView}
        >
          <FaRegCalendarAlt
            className={cn(
              'h-5 w-5 transition-colors group-hover:text-gray-900',
              calendarView && 'text-white'
            )}
          />
        </ActionIcon>
      </div>
      
      {!calendarView ? (
        <div className='mt-4'>
          <div className="ms-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 xl:grid-cols-9 gap-3">
            <Button
              variant="outline"
              className={cn(
                "mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0",
                statusType === 'todo' && 'text-white bg-black'
              )}
              onClick={() => handleStatusFilterApiCall("todo")}
            >
              To Do
            </Button>
            <Button
              variant="outline"
              className={cn(
                "mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0",
                statusType === 'overdue' && 'text-white bg-black'
              )}
              onClick={() => handleStatusFilterApiCall("overdue")}
            >
              Overdue
            </Button>
            <Button
              variant="outline"
              className={cn(
                "mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0",
                statusType === 'done' && 'text-white bg-black'
              )}
              onClick={() => handleStatusFilterApiCall("done")}
            >
              Done
            </Button>
            <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
              <DatePeriodSelectionForm setStartDate={setStartDate} setEndDate={setEndDate} statusType={statusType} activityType={activityType} setPeriod={setPeriod} />
            </div>
            <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
              <ActivitySelectionForm setActivityType={setActivityType} statusType={statusType} startDate={startDate} endDate={endDate} period={period} />
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-4'>
          <div className="ms-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 gap-3">
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
            <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
              <DatePeriodSelectionForm setStartDate={setStartDate} setEndDate={setEndDate} statusType={statusType} activityType={activityType} />
            </div>
          </div>
        </div>
      )
      }
      {!calendarView ? (
        <div className='mt-8'>
          <ActivityTablePage statusType={statusType} activityType={activityType} startDate={startDate} endDate={endDate} period={period} />
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

