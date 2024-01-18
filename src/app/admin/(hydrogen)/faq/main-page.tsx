"use client";
import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, getAllClient } from '@/redux/slices/user/client/clientSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AddFaqForm from '@/app/shared/(admin)/faq/create-edit/add-edit-faq-form';
import FAQTable from '@/app/shared/(admin)/faq/faq-list/table';
import { getAllFaq } from '@/redux/slices/admin/faq/faqSlice';


const pageHeader = {
  title: 'FAQ',
};

export default function FaqPage() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [currentPagee, setCurrentPagee] = useState(1);
    const router = useRouter();
    const FaqSliceData = useSelector((state: any) => state?.root?.adminFaq);
    console.log("FAQ data....", FaqSliceData);

    // console.log("current page in main file...", currentPagee);

    // useEffect(() => {
    //   dispatch(getAllClient({page: 1, items_per_page: 5, sort_order: 'desc', sort_field: 'name', search: undefined}))
    // }, [dispatch])


    const handleChangePage = async (paginationParams: any) => {
      let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
      // console.log("Items per page...", items_per_page);
      setCurrentPagee(page);
      const response = await dispatch(getAllFaq({ page, items_per_page, sort_field, sort_order, search }));
      // console.log("handleChange response....", response.payload)
      const { data } = response?.payload;
      const maxPage:number = data?.page_count;
  
      if (page > maxPage) {
        page = maxPage > 0 ? maxPage : 1;
        await dispatch(getAllFaq({ page, items_per_page, sort_field, sort_order, search }));
        return data?.client
      }
      return data?.client
    };
    
    const handleDeleteById = async (id: string | string[], countPerPage?: number, currentPage?: number) => {

      // console.log("delete id in main page....", id)

      try {
        const res = await dispatch(deleteClient({ client_ids: id }));
        // console.log("delete response....", res)
        if (res.payload.success === true ) {
          closeModal();
          console.log("currentpage before get and after delete....", currentPagee)
          const reponse = await dispatch(getAllFaq({ page: currentPagee, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc' }));
          console.log("response after delete...", reponse)
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
          label="Add FAQ"
          view={<AddFaqForm title="FAQ" />}
          customSize="800px"
          className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
        />
        </div>
      </PageHeader>
      <FAQTable total={FaqSliceData?.data?.page_count} page={currentPagee} handleDeleteById={handleDeleteById} handleChangePage={handleChangePage} data={FaqSliceData?.data?.client} />
    </>
  );
}
