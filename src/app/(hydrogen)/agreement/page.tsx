"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CustomTable from '@/components/common-tables/table';
import { AgreementColumns } from '@/app/shared/agreement/columns';
import { deleteAgencyAgreement, getAllAgencyagreement } from '@/redux/slices/user/agreement/agreementSlice';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';


const pageHeader = {
    title: 'Aggrement',
};


export default function AgreementPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const { agreementDetails, loading } = useSelector((state: any) => state?.root?.agreement);

    const [pageSize, setPageSize] = useState(5)

    //Paggination Handler
    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        const response = await dispatch(getAllAgencyagreement({ page, items_per_page, sort_field, sort_order, search }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllAgencyagreement({ page, items_per_page, sort_field, sort_order, search }));
            return data?.client
        }
        return data?.client
    };

    // Delete Handler
    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number) => {
        try {
            const res = await dispatch(deleteAgencyAgreement({ agreementIdsToDelete: id }));
            if (res.payload.success === true) {
                const reponse = await dispatch(getAllAgencyagreement({ page: currentPage, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc' }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* <h1>Aggrement</h1> */}
            <PageHeader title={pageHeader.title}>
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    <Button type='button' onClick={() => { router.push(`/agreement/create-agreement`) }} className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0'>Add Agreement</Button>
                </div>
            </PageHeader>
            {/* <Button type='button' onClick={() => { router.push(`/agreement/create-agreement`)}}>Add</Button> */}
            <CustomTable
                data={agreementDetails?.data || []}
                total={agreementDetails?.page_count || 1}
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