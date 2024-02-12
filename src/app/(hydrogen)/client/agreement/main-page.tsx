"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '@/components/common-tables/table';
import { deleteAgencyAgreement } from '@/redux/slices/user/agreement/agreementSlice';
import PageHeader from '@/app/shared/page-header';
import { AgreementColumns } from '@/app/shared/(user)/agreement/columns';
import { getAllclientagreement } from '@/redux/slices/user/client/agreement/clientAgreementSlice';

const pageHeader = {
    title: 'Aggrement',
};

const Dummy_Data = [{
    "title": "test title",
    "receiver": "receiver Data",
    "due_date": "18th Dec. ‘23",
    "status": "pending"

}, {
    "title": "test title",
    "receiver": "receiver Data",
    "due_date": "18th Dec. ‘23",
    "status": "pending"

}]

export default function AgreementPage() {
    const dispatch = useDispatch();
    const { agreementDetails, loading } = useSelector((state: any) => state?.root?.clienAgreement);
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const [pageSize, setPageSize] = useState(5)

    //Paggination Handler
    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        const response = await dispatch(getAllclientagreement({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllclientagreement({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId }));
            return data?.client
        }
        return data?.client
    };

    // Delete Handler
    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number) => {
        try {
            const res = await dispatch(deleteAgencyAgreement({ agencies: id, is_deleted: true, agency_id: clientSliceData?.agencyId }));
            if (res.payload.success === true) {
                const reponse = await dispatch(getAllclientagreement({ page: currentPage, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc', agency_id: clientSliceData?.agencyId }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(agreementDetails, 'agreementDetails')
    return (
        <>
            {/* <h1>Aggrement</h1> */}
            <PageHeader title={pageHeader.title} />

            {/* <Button type='button' onClick={() => { router.push(`/agreement/create-agreement`)}}>Add</Button> */}
            <CustomTable
                data={agreementDetails?.data?.agreements || []}
                total={agreementDetails?.data?.page_count || 1}
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleDeleteById={handleDeleteById}
                handleChangePage={handleChangePage}
                getColumns={AgreementColumns}
            />
        </>
    )

}