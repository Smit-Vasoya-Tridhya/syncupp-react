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


const pageHeader = {
  title: 'Client',
};

export default function ClientPage() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const router = useRouter();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    console.log("Client data....", clientSliceData);

    // useEffect(() => {
    //   dispatch(getAllClient({page: 1, items_per_page: 5, sort_order: 'desc', sort_field: 'name', search: undefined}))
    // }, [dispatch])


    const handleChangePage = async (paginationParams: any) => {
      let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
      console.log("Items per page...", items_per_page);
      const response = await dispatch(getAllClient({ page, items_per_page, sort_field, sort_order, search }));
      console.log("handleChange response....", response.payload)
      const { data } = response?.payload;
      const maxPage:number = data?.page_count;
  
      if (page > maxPage) {
        page = maxPage > 0 ? maxPage : 1;
      }
      // return await dispatch(getAllClient({ page, items_per_page, sort_field, sort_order, search }));
      return data?.client
    };
    
    const handleDeleteById = async (id: string | string[]) => {

      // console.log("delete id in main page....", id)

      try {
        const res = await dispatch(deleteClient({ client_ids: id }));
        // console.log("delete response....", res)
        if (res.payload.status === false ) {
          // toast.error(res.payload.message);
        } else {
          closeModal();
          await dispatch(getAllClient({ sort_field: 'createdAt', sort_order: 'desc' }));
          // toast.success(res.payload.message);
        }
      } catch (error) {
        console.error(error);
      }
    };


    

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <ModalButton
          label="Add Client"
          view={<AddClientForm title="New Client" />}
          customSize="800px"
          className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
        />
        </div>
      </PageHeader>
      <ClientTable total={clientSliceData?.data?.page_count} handleDeleteById={handleDeleteById} handleChangePage={handleChangePage} data={clientSliceData?.data?.client} />
    </>
  );
}
