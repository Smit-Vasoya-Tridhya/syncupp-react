'use client';
import PageHeader from '@/app/shared/page-header';
import MetricCard from '@/components/cards/metric-card';
import cn from '@/utils/class-names';
import React, { useEffect, useState } from 'react';
import { Text, Title } from '@/components/ui/text';
import CustomTable from '@/components/common-tables/table';
import { billingColumns } from '@/app/shared/(user)/manage-subscription/billingcoloum';
import { getColumns } from '@/app/shared/(user)/manage-subscription/manageseatscoloums';
import { useDispatch, useSelector } from 'react-redux';
import {
  RemoveUsersub,
  getAllBilling,
  getAllSeats,
} from '@/redux/slices/user/manage-subscription.tsx/SubscriptionSlice';

const dummyDataBilling = [
  {
    No: '1',
    billing_amount: '$100',
    Date: '2024-02-12',
    seats_counts: '5',
  },
  {
    No: '2',
    billing_amount: '$150',
    Date: '2024-02-13',
    seats_counts: '10',
  },
  // Add more objects as needed
];

const generateDummyData = (count: any) => {
  const dummyData = [];

  for (let i = 1; i <= count; i++) {
    dummyData.push({
      seat_No: `Seat ${i}`,
      Allocated_To: `User ${i}`,
      user_type: Math.random() > 0.5 ? 'Admin' : 'User',
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
      _id: i, // Assuming this is a unique identifier for each row
    });
  }

  return dummyData;
};

// Usage example
const dummyDataCount = 10; // You can adjust this based on the number of rows you want
const dummyData = generateDummyData(dummyDataCount);

function SubcripationPage() {
  const { BillinglistDetails, SeatsData, CardData, loading } = useSelector(
    (state: any) => state?.root?.managesubcription
  );
  const disptach = useDispatch();

  const [pageSize, setPageSize] = useState<number>(5);
  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } =
      paginationParams;

    const response = await disptach(
      getAllBilling({
        page,
        items_per_page,
        sort_field,
        sort_order,
        search,
        pagination: true,
      })
    );
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await disptach(
        getAllBilling({
          page,
          items_per_page,
          sort_field,
          sort_order,
          search,
          pagination: true,
        })
      );
      return data?.coupon;
    }
    if (data && data?.payment_history && data?.payment_history?.length !== 0) {
      return data?.payment_history;
    }
  };

  const handleChangePageSheet = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } =
      paginationParams;

    const response = await disptach(
      getAllSeats({
        page,
        items_per_page,
        sort_field,
        sort_order,
        search,
        pagination: true,
      })
    );
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await disptach(
        getAllSeats({
          page,
          items_per_page,
          sort_field,
          sort_order,
          search,
          pagination: true,
        })
      );
      return data?.coupon;
    }
    if (data && data?.payment_history && data?.payment_history?.length !== 0) {
      return data?.payment_history;
    }
  };

  console.log(SeatsData, 'seatdata');

  const handleDeleteById = async (
    id: string | string[],
    currentPage?: any,
    countPerPage?: number,
    sortConfig?: Record<string, string>,
    searchTerm?: string
  ) => {
    console.log('remove');
    try {
      const res = await disptach(RemoveUsersub({ userId: id }));
      if (res.payload.success === true) {
        //closeModal();
        const reponse = await disptach(
          getAllSeats({
            page: currentPage,
            items_per_page: countPerPage,
            sort_field: sortConfig?.key,
            sort_order: sortConfig?.direction,
            search: searchTerm,
            pagination: true,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    disptach(getAllBilling({ pagination: false }));
    disptach(getAllSeats({ pagination: false }));
  }, [disptach]);

  return (
    <>
      <PageHeader title="Manage Subscription"></PageHeader>
      <div className="grid grid-cols-3 gap-5 @xl:grid-cols-3 @6xl:grid-cols-3 3xl:gap-8">
        <MetricCard
          key="1"
          title="Next Billing"
          metric=" "
          metricClassName="3xl:text-[22px]"
          className={cn('w-full max-w-full justify-between')}
        >
          <Text className="mt-3 flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn('me-2 inline-flex items-center font-medium')}
            >
              $ 30
            </Text>
          </Text>
          <Text className="mt-3 flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn('me-2 inline-flex items-center font-medium')}
            >
              15-feb-2015
            </Text>
          </Text>
        </MetricCard>
        <MetricCard
          key="1"
          title="Available Seats"
          metric=""
          metricClassName="3xl:text-[22px]"
          className={cn('w-full max-w-full justify-between')}
        >
          <Text className="mt-3 flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn('me-2 inline-flex items-center font-medium')}
            >
              1
            </Text>
          </Text>
        </MetricCard>
        <MetricCard
          key="1"
          title="Referral Points"
          metric=""
          metricClassName="3xl:text-[22px]"
          className={cn('w-full max-w-full justify-between')}
        >
          <Text className="mt-3 flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn('me-2 inline-flex items-center font-medium')}
            >
              {' '}
              Earned points 200
            </Text>
          </Text>
          <Text className="mt-3 flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn('me-2 inline-flex items-center font-medium')}
            >
              {' '}
              Available points 200
            </Text>
          </Text>
        </MetricCard>
      </div>
      <div className="mt-4">
        <Title className="mb-4">Billing History</Title>
        <CustomTable
          // data={dummyDataBilling}
          data={BillinglistDetails?.data?.payment_history || []}
          total={BillinglistDetails?.data?.page_count}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleChangePage={handleChangePage}
          getColumns={billingColumns}
        />
      </div>
      <div className="mt-4">
        <Title className="mb-4">Manage Seats</Title>
        <CustomTable
          // data={dummyData}
          data={SeatsData?.data?.sheets || []}
          total={SeatsData?.data?.page_count}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleDeleteById={handleDeleteById}
          handleChangePage={handleChangePageSheet}
          getColumns={getColumns}
        />
      </div>
    </>
  );
}

export default SubcripationPage;
