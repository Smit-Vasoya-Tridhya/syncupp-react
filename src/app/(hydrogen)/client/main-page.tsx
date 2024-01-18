"use client";
// import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import AddClientForm from '@/app/shared/(user)/client/create-edit/add-client-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, getAllClient } from '@/redux/slices/user/client/clientSlice';
import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CommonTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(user)/client/client-list/columns';

const pageHeader = {
  title: 'Client',
};

export default function ClientPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { closeModal } = useModal();

  const clientSliceData = useSelector((state: any) => state?.root?.client);
  
  const [pageSize, setPageSize] = useState<number>(5);

  // console.log("Client data....", clientSliceData);

  // console.log("current page in main file...", currentPagee);



  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;

    const response = await dispatch(getAllClient({ page, items_per_page, sort_field, sort_order, search }));
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await dispatch(getAllClient({ page, items_per_page, sort_field, sort_order, search }));
      return data?.client
    }
    return data?.client
  };

  const handleDeleteById = async (id: string | string[], currentPage?: number, countPerPage?: number) => {

    // console.log("delete id in main page....", id)

    try {
      const res = await dispatch(deleteClient({ client_ids: id }));
      // console.log("delete response....", res)
      if (res.payload.success === true) {
        closeModal();
        // console.log("currentpage before get and after delete....", currentPage)
        const reponse = await dispatch(getAllClient({ page: currentPage, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc' }));
        // console.log("response after delete...", reponse)
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
      <CommonTable
        data={clientSliceData?.data?.client}
        total={clientSliceData?.data?.page_count}
        loading={clientSliceData?.loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleDeleteById={handleDeleteById}
        handleChangePage={handleChangePage}
        getColumns={getColumns}
      />
    </>
  );
}
