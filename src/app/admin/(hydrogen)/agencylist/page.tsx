"use client";
import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import AddClientForm from '@/app/shared/(user)/client/create-edit/add-client-form';
import ClientTable from '@/app/shared/(user)/client/client-list/table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, getAllClient } from '@/redux/slices/user/client/clientSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AgencyTable from '@/app/shared/(admin)/agency/table';
import { deleteAgency, getAllAgency } from '@/redux/slices/admin/agency/agencySlice';


const pageHeader = {
    title: 'Agency list',
};


export default function ClientPage() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [currentPagee, setCurrentPagee] = useState(1);
    const router = useRouter();
    const { agencylistDetails, loading } = useSelector((state: any) => state?.root?.adminAgency);
    console.log("agencylistDetails", agencylistDetails, loading);


    // useEffect(() => {
    //     dispatch(getAllAgency({ page: 1, items_per_page: 5, sort_order: 'desc', sort_field: 'createdAt', search: undefined }))
    // }, [dispatch])


    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        // console.log("Items per page...", items_per_page);
        setCurrentPagee(page);
        const response = await dispatch(getAllAgency({ page, items_per_page, sort_field, sort_order, search }));
        // console.log("handleChange response....", response.payload)
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllAgency({ page, items_per_page, sort_field, sort_order, search }));
            return data?.client
        }
        return data?.client
    };

    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {
        console.log(searchTerm,'searchTerm')
        try {
            const res = await dispatch(deleteAgency({ agencies: id, is_deleted: true }));
            if (res.payload.success === true) {
                closeModal();
                console.log("currentpage before get and after delete....", currentPagee)
                const reponse = await dispatch(getAllAgency({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm }));
                console.log("response after delete...", reponse)
            }
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <>
            <PageHeader title={pageHeader.title}>
            </PageHeader>
            <AgencyTable total={agencylistDetails?.data?.page_count} loading={loading} page={currentPagee} handleDeleteById={handleDeleteById} handleChangePage={handleChangePage} data={agencylistDetails?.data?.agencyList} />
        </>
    );
}
