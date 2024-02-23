"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { deleteTask } from '@/redux/slices/user/task/taskSlice';
import { GetActivityColumns } from '@/app/shared/(user)/calender/calender-list/columns';
import { getAllActivity, setPaginationDetails } from '@/redux/slices/user/activity/activitySlice';
import cn from '@/utils/class-names';
import { Button } from 'rizzui';
import DatePeriodSelectionForm from '@/app/shared/(user)/forms/select-period-form';
import ActivitySelectionForm from '@/app/shared/(user)/forms/activity-selection-form';


export default function TeamActivityTablePage(props: any) {

    const { teamId } = props;


    const dispatch = useDispatch();
    const router = useRouter();
    const signIn = useSelector((state: any) => state?.root?.signIn)
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const activityData = useSelector((state: any) => state?.root?.activity);

    const [pageSize, setPageSize] = useState<number>(5);
    const [activityType, setActivityType] = useState('');
    const [statusType, setStatusType] = useState('');
    const [period, setPeriod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const handleStatusFilterApiCall = (filterStatusValue: string) => {
        setStatusType(filterStatusValue);
        if (signIn?.role !== 'client' && signIn?.role !== 'team_client') {
            if (activityType === '' && endDate === '' && startDate === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, filter: { status: filterStatusValue }, pagination: true }))
            } else if (endDate === '' && startDate === '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, filter: { status: filterStatusValue, activity_type: activityType }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, filter: { status: filterStatusValue, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, filter: { status: filterStatusValue, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            }
        } else {
            if (activityType === '' && endDate === '' && startDate === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue }, pagination: true }))
            } else if (endDate === '' && startDate === '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue, activity_type: activityType }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc',  client_team_id: teamId, agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            }
        }
    }


    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;

        dispatch(setPaginationDetails({ pageNumber: page, itemsPerPageNumber: items_per_page }))

        const response = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search,  client_team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true })) : await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId,  client_team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            // await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search }));
            signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search,  client_team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true })) : await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId,  client_team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }));
            return data?.client
        }
        if (data && data?.client && data?.client?.length !== 0) {
            return data?.client
        }
    };

    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {

        // console.log("delete id in main page....", id)

        try {
            const res = typeof id === 'string' ? await dispatch(deleteTask({ taskIdsToDelete: [id] })) : await dispatch(deleteTask({ taskIdsToDelete: id }));
            if (res.payload.success === true) {
                const reponse = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm,  client_team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true })) : await dispatch(getAllActivity({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, agency_id: clientSliceData?.agencyId,  client_team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }));
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
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
                        <DatePeriodSelectionForm setStartDate={setStartDate} setEndDate={setEndDate} statusType={statusType} activityType={activityType} setPeriod={setPeriod} clientTeamId={teamId} />
                    </div>
                    <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
                        <ActivitySelectionForm setActivityType={setActivityType} statusType={statusType} startDate={startDate} endDate={endDate} period={period} clientTeamId={teamId} />
                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <CustomTable
                    data={activityData && activityData?.data?.activity}
                    total={activityData && activityData?.data?.page_count}
                    loading={activityData && activityData?.loading}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    handleDeleteById={handleDeleteById}
                    handleChangePage={handleChangePage}
                    getColumns={GetActivityColumns}
                />
            </div>
        </>
    );
}
