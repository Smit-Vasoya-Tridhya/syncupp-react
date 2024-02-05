"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(admin)/client-review/client-review-list/columns';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import AddClientReviewForm from '@/app/shared/(admin)/client-review/create-edit/add-edit-client-review-form';
import { deleteClientReviewData, getAllClientReview } from '@/redux/slices/admin/clientReview/clientReviewSlice';

const pageHeader = {
  title: 'Client Review',
};

export default function ClientReviewPage() {

    const dispatch = useDispatch();
    const adminClientReview = useSelector((state: any) => state?.root?.adminClientReview);
    const [pageSize, setPageSize] = useState(5)

    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        const response = await dispatch(getAllClientReview({ page, items_per_page, sort_field, sort_order, search }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllClientReview({ page, items_per_page, sort_field, sort_order, search }));
            return data.faqs
        }
        return data.faqs
    };

    const handleDeleteById = async (_id: string | string[], currentPage?: any, countPerPage?: number) => {
        try {
            const res = await dispatch(deleteClientReviewData({ faqIdsToDelete: _id, is_deleted: true }));
            if (res.payload.success === true) {
              const reponse = await dispatch(getAllClientReview({ page: currentPage, items_per_page: countPerPage, sort_field: 'title', sort_order: 'description' }));
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
            label="Add Client Review"
            view={<AddClientReviewForm title="Client Review" />}
            customSize="800px"
            className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
          />
        </div>
      </PageHeader>
            <CustomTable
                data={adminClientReview?.data?.faqs}
                total={adminClientReview?.data?.pagination?.total_pages}
                loading={adminClientReview?.loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleDeleteById={handleDeleteById}
                handleChangePage={handleChangePage}
                getColumns={getColumns}
            />
        </>
    )

}
