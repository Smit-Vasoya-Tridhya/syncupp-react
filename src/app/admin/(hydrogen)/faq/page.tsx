"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CustomTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(admin)/faq/columns';
import { getAllfaq } from '@/redux/slices/admin/faq/faqSlice';


const pageHeader = {
    title: 'FAQ',
};

export default function FaqPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const { faqlistDetails, loading } = useSelector((state: any) => state?.root?.faq);
    console.log("faqlistDetails", faqlistDetails, loading);

    const [pageSize, setPageSize] = useState(5)


    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        // console.log("Items per page...", items_per_page);
        const response = await dispatch(getAllfaq({ page, items_per_page, sort_field, sort_order, search }));
        // console.log("handleChange response....", response.payload)
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllfaq({ page, items_per_page, sort_field, sort_order, search }));
            return data?.client
        }
        return data?.client
    };

    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number) => {
        // try {
        //     const res = await dispatch(deleteAgency({ agencies: id, is_deleted: true }));
        //     if (res.payload.success === true) {
        //                        const reponse = await dispatch(getAllAgency({ page: currentPage, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc' }));
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <>
            <h1>FAQ</h1>
            <CustomTable
                data={[]}
                total={10}
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
                // handleDeleteById={handleDeleteById}
                handleChangePage={handleChangePage}
                getColumns={getColumns}
            />
        </>
    )

}