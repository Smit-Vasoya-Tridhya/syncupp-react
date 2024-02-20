'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import { ActionIcon, Badge, Button, Popover, Tooltip } from 'rizzui';
import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { FaRegFilePdf } from "react-icons/fa";
import { postDownloadInvoice, postSendInvoice, updateInvoiceStatus } from '@/redux/slices/user/invoice/invoiceSlice';
import { RiDraftLine } from 'react-icons/ri';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
interface InvoiceDetailsProps {
  row: any; // Update with the type of row data
  StatusHandler: (status: string, id: string, setOpen: (value: boolean) => void) => void; // Update with the type of StatusHandler function
}

const statusCountOptions = [
  { name: 'Draft', value: 'draft' },
  { name: 'Overdue', value: 'overdue' },
  { name: 'Unpaid', value: 'unpaid' },
  { name: 'Paid', value: 'paid' },
]

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  row: any;
  setOpen: any;
};

export const InvoiceColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  row,
  setOpen,
}: Columns) => {

  const dispatch = useDispatch();
  const invoiceSliceData = useSelector((state: any) => state?.root?.invoice);
  const [selectedStatus, setSelectedStatus] = useState<{ status: string, id: string }>({ status: '', id: '' });

  const EmailSend = (id: string) => {
    dispatch(postSendInvoice({ invoice_id: id })).then(
      (result: any) => {
        if (postSendInvoice.fulfilled.match(result)) {
          // console.log('resultt', result)
          if (result && result.payload.success === true) { }
        }
      }
    );
  };
  const DownloadInvoice = (id: string) => {
    dispatch(postDownloadInvoice({ invoice_id:id })).then(
      (result: any) => {
        if (postDownloadInvoice.fulfilled.match(result)) {
          // console.log('resultt', result)
          if (result && result.payload.success === true) {}
        }
      }
    );
  };

  const StatusHandler = (status: string, id: string, setOpen: any) => {
    // setOpen(false)
    dispatch(updateInvoiceStatus({ status: status, invoice_id: id })).then((result: any) => {
      if (updateInvoiceStatus.fulfilled.match(result)) {
        // console.log('resultt', result)
        if (result && result.payload.success === true) {
          // dispatch(getAllAgencyagreement({ page: currentPage, items_per_page: pageSize, sort_field: sortConfig?.key, sort_order: sortConfig?.direction }));
        }
      }
    })
  }
  const handleStatusChange = (_funSetOpen: any, status: string, id: string) => {
    // setSelectedStatus({ status: "", id:"" });
    _funSetOpen(false)
    setSelectedStatus({ status, id });
    StatusHandler(status, id, setOpen);
  };
  // console.log(data, row, "finding")

  return [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 50,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row._id)}
            {...(onChecked && { onChange: () => onChecked(row._id) })}
          />
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Number"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'invoice_number'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('invoice_number'),
      dataIndex: 'invoice_number',
      key: 'invoice_number',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Customer"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'customer_name'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('customer_name'),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Amount"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'total'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('total'),
      dataIndex: 'total',
      key: 'total',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Invoice Date"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'invoice_date'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('invoice_date'),
      dataIndex: 'invoice_date',
      key: 'invoice_date',
      width: 200,
      render: (value: string) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        return (
          <Text className="font-medium text-gray-700">{formattedDate}</Text>
        );
      },
    },
    {
      title: (
        <HeaderCell
          title="Due date"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'due_date'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('due_date'),
      dataIndex: 'due_date',
      key: 'due_date',
      width: 200,
      render: (value: string) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        return (
          <Text className="font-medium text-gray-700">{formattedDate}</Text>
        );
      },
    },
    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('status'),
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (_: any, row: any, control: any) => (
        <div className="flex items-center justify-start gap-3 text-center">
          <Popover
            placement="left"
            className="z-50 min-w-[140px] px-0"
            content={({ setOpen }: { setOpen: (value: boolean) => void }) => (
              <div className="text-gray-700">
                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
                  // className={`flex w-full items-center justify-start px-4 py-2.5 focus:outline-none ${selectedStatus?.status === 'draft' ? 'font-semibold' : ''
                  //   }`}
                  onClick={() => handleStatusChange(setOpen,'draft', row?._id)}
                  disabled={row?.status === "draft"}
                >
                  Draft
                </Button>
                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
                  // className={`flex w-full items-center justify-start px-4 py-2.5 focus:outline-none ${selectedStatus?.status === 'overdue' ? 'font-semibold' : ''
                  //   }`}
                  onClick={() => handleStatusChange(setOpen,'overdue', row?._id)}
                  disabled={row?.status === "overdue"}
                >
                  Overdue
                </Button>
                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
                  // className={`flex w-full items-center justify-start px-4 py-2.5 focus:outline-none ${selectedStatus?.status === 'unpaid' ? 'font-semibold' : ''
                  //   }`}
                  onClick={() => handleStatusChange(setOpen,'unpaid', row?._id)}
                  disabled={row?.status === "unpaid"}
                >
                  Unpaid
                </Button>
                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
                  // className={`flex w-full items-center justify-start px-4 py-2.5 focus:outline-none ${selectedStatus?.status === 'paid' ? 'font-semibold' : ''
                  //   }`}
                  onClick={() => handleStatusChange(setOpen,'paid', row?._id)}
                  disabled={row?.status === "paid"}
                >
                  Paid
                </Button>
              </div>
            )}
          >
            <ActionIcon variant="text" className="">
              <Button type="button" className="capitalize">
                {selectedStatus?.id === row?._id ? selectedStatus?.status : row?.status}
              </Button>
            </ActionIcon>
          </Popover>
        </div>
      ),
    },

    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: Record<string, string>) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={() => 'Edit Invoice'}
            placement="top"
            color="invert"
          >
            <Link href={`${routes.invoiceEdit}/${row._id}`}>
              <Button
                size="sm"
                variant="outline"
                className="bg-white text-black"
                aria-label={'View Member'}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => 'View Invoice'}
            placement="top"
            color="invert"
          >
            <Link href={`${routes.invoiceView}/?_id=${row._id}`}>
              <Button
                size="sm"
                variant="outline"
                className="bg-white text-black"
                aria-label={'View Member'}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => 'Download Invoice'}
            placement="top"
            color="invert"
          >
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-black"
              aria-label={'View Member'}
              onClick={() => DownloadInvoice(row._id)}
            >
              <FaRegFilePdf className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => 'Send Invoice'}
            placement="top"
            color="invert"
          >
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-black"
              aria-label={'View Member'}
              onClick={() => EmailSend(row._id)}

            >
              <AiOutlineMail className="h-4 w-4" />
            </Button>
          </Tooltip>
          <DeletePopover
            title={`Delete the Invoice`}
            description={`Are you sure you want to delete?`}
            onDelete={() => onDeleteItem(row._id)}
          />
        </div>
      ),
    },
  ];
}
