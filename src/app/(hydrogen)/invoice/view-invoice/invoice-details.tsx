'use client';

import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import Table from '@/components/ui/table';
import { siteConfig } from '@/config/site.config';
import { InvoiceFormInput } from '@/utils/validators/create-invoice.schema';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInvoiceDataByID } from '@/redux/slices/user/invoice/invoiceSlice';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'rizzui';
import { FaArrowLeft } from 'react-icons/fa';
import { routes } from '@/config/routes';

export default function InvoiceDetails(props: any) {
  const invoiceSliceData = useSelector((state: any) => state?.root?.invoice);
  const dispatch = useDispatch();
  const router = useSearchParams();
  const _id  = router.get('_id');
  
  useEffect(() => {
    dispatch(getInvoiceDataByID({ _id: _id }))
  }, [_id , dispatch]); 
  const data  = invoiceSliceData?.getInvoiceDataByIDdata?.data?.[0];

  const defaultValuess = {
      invoice_number: data?.invoice_number ?? '',
      due_date: data?.due_date ?? '',
      invoice_date: data?.invoice_date ?? '',
      invoice_content: 
        {
          item: data?.invoice_content?.item ?? '',
          qty: data?.invoice_content?.qty ?? '',
          rate: data?.invoice_content?.rate ?? '',
          tax: data?.invoice_content?.tax ?? '',
          amount: data?.invoice_content?.amount ?? '',
          description: data?.invoice_content?.description ?? '',
        },
      
      sub_total: data?.sub_total ?? 0,
      total: data?.total ?? 0,
      createdAt: data?.createdAt ?? '',
      updatedAt: data?.updatedAt ?? '',
      status: data?.status ?? '',
      from: {
        name: data?.from?.name ?? '',
        company_name: data?.from?.company_name ?? '',
        address: data?.from?.address ?? '',
        pincode: data?.from?.pincode ?? 0,
        state: {
          name: data?.from?.state?.name ?? '',
        },
        city: {
          name: data?.from?.city?.name ?? '',
        },
        country: {
          name: data?.from?.country?.name ?? '',
        },
      },
      to: {
        name: data?.to?.name ?? '',
        company_name: data?.to?.company_name ?? '',
        address: data?.to?.address ?? '',
        pincode: data?.to?.pincode ?? 0,
        state: {
          name: data?.to?.state?.name ?? '',
        },
        city: {
          name: data?.to?.city?.name ?? '',
        },
        country: {
          name: data?.to?.country?.name ?? '',
        },
      },
  };

  const columns = [
    {
      title: 'item',
      key: 'item',
      width: 250,
      render: (product: any) => (
        <>
          <Title as="h6" className="mb-0.5 text-sm font-medium">
            {product?.item}
          </Title>
        </>
      ),
    },
    {
      title: 'Quentity',
      key: 'qty',
      width: 250,
      render: (product: any) => (
        <>
          <Title as="h6" className="mb-0.5 text-sm font-medium">
            {product?.qty}
          </Title>
        </>
      ),
    },
    {
      title: 'Rate',
      key: 'rate',
      width: 250,
      render: (product: any) => (
        <>
          <Title as="h6" className="mb-0.5 text-sm font-medium">
            {product?.rate}
          </Title>
        </>
      ),
    },
    {
      title: 'Taxes',
      key: 'tax',
      width: 250,
      render: (product: any) => (
        <>
          <Title as="h6" className="mb-0.5 text-sm font-medium">
            {product?.tax}
          </Title>
        </>
      ),
    },
    {
      title: 'Amount',
      key: 'amount',
      width: 250,
      render: (product: any) => (
        <>
          <Title as="h6" className="mb-0.5 text-sm font-medium">
            {product?.amount}
          </Title>
        </>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      width: 250,
      render: (product: any) => (
        <>
          <Title as="h6" className="mb-0.5 text-sm font-medium">
            {product?.description}
          </Title>
        </>
      ),
    },
  ];
  function InvoiceDetailsListTable() {
    return (
      <Table
        data={data?.invoice_content}
        columns={columns}
        variant="minimal"
        rowKey={(record) => record.id}
        scroll={{ x: 660 }}
        className="mb-11"
      />
    );
  }
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return (
    <>
      <Link href={routes.invoice} className="w-full">
        <Button className="float-end mb-2 mt-5 bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
          <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
          Back
        </Button>
      </Link>
      <div className="w-full rounded-xl border border-gray-200 p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
        <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.title}
            height={30}
            width={30}
            className="dark:invert"
            priority
          />
          <div className="mb-4 md:mb-0">
            <Badge
              variant="flat"
              color={
                data?.status === 'draft'
                  ? 'primary'
                  : data?.status === 'paid'
                  ? 'success'
                  : data?.status === 'unpaid'
                  ? 'warning'
                  : data?.status === 'overdue'
                  ? 'danger'
                  : 'primary'
              }
              rounded="md"
              className="mb-3 md:mb-2"
            >
              {data?.status}
            </Badge>
            <Title as="h6">{data?.invoice_number}</Title>
            <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
          </div>
        </div>

        <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
          <div className="">
            <Title as="h6" className="mb-3.5 font-semibold">
              From
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              {data?.from?.name}
            </Text>
            <Text className="mb-1.5">{data?.from?.company_name}</Text>
            <Text className="mb-1.5">
              {data?.from?.address}, <br /> {data?.from?.city.name},{' '}
              {data?.from?.state.name}, {data?.from?.country.name}
            </Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">{data?.from?.pincode}</Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">Creation Date</Text>
              <Text>{data?.createdAt ? formatDate(data.createdAt) : ''}</Text>
            </div>
          </div>
          <div className="mt-4 xs:mt-0">
            <Title as="h6" className="mb-3.5 font-semibold">
              Bill To
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              {data?.to?.name}
            </Text>
            <Text className="mb-1.5">{data?.to?.company_name}</Text>
            <Text className="mb-1.5">
              {data?.to?.address}, <br /> {data?.to?.city.name},{' '}
              {data?.to?.state.name}, {data?.to?.country.name}
            </Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">{data?.to?.pincode}</Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">Due Date</Text>
              <Text>{data?.due_date ? formatDate(data.due_date) : ''}</Text>
            </div>
          </div>
        </div>

        <InvoiceDetailsListTable />

        <div className="flex flex-col-reverse items-start justify-between border-t border-gray-200 pb-4 pt-8 xs:flex-row">
          <div className="mt-6 max-w-md pe-4 xs:mt-0"></div>
          <div className=" w-full max-w-sm">
            <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
              Total: <Text as="span">${data?.total}</Text>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
