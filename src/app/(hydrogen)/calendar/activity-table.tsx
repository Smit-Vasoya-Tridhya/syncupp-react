
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { deleteTask } from '@/redux/slices/user/task/taskSlice';
import { GetActivityColumns } from '@/app/shared/(user)/calender/calender-list/columns';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';


export default function ActivityTablePage() {


    const dispatch = useDispatch();
    const router = useRouter();
    const signIn = useSelector((state: any) => state?.root?.signIn)
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const activityData = useSelector((state: any) => state?.root?.activity);

    const [pageSize, setPageSize] = useState<number>(5);


    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;

        const response = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search })) : await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            // await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search }));
            signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search })) : await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId }));
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
                const reponse = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm })) : await dispatch(getAllActivity({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, agency_id: clientSliceData?.agencyId }));
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
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
        </>
    );
}
