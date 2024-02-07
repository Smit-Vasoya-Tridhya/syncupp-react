'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import CustomModalButton from '@/app/shared/custom-modal-button';
//import AddClientForm from '../create-edit/add-client-form';
import { Badge, Button } from 'rizzui';
import { LuExternalLink } from 'react-icons/lu';
import moment from 'moment';
import { routes } from '@/config/routes';
import AddClientForm from '../../(user)/agency/client/create-edit/add-client-form';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (
    id: string | string[],
    currentPage?: any,
    countPerPage?: number,
    Islastitem?: boolean,
    sortConfig?: Record<string, string>,
    searchTerm?: string
  ) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  currentPage?: number;
  pageSize?: number;
  searchTerm?: string;
};

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
        </div>
      );
    case 'active':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 'inactive':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Inactive</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  currentPage,
  pageSize,
  searchTerm,
}: Columns) => [
  {
    title: (
      <HeaderCell
        title="Brand Name"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'brand'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('brand'),
    dataIndex: 'brand',
    key: 'brand',
    width: 200,
    render: (value: string, row: any) => {
      console.log(value, data, row, 'value');

      return <Text className="font-medium text-gray-700">{value}</Text>;
    },
  },
  {
    title: (
      <HeaderCell
        title="Brand Logo"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'brandLogo'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('brandLogo'),
    dataIndex: 'brandLogo',
    key: 'brandLogo',
    width: 200,
    render: (value: string) => (
      <>
        {value && value != '' ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API}${value}`}
            style={{ width: '53.33px', height: '30px' }}
          ></img>
        ) : (
          <Text className="font-medium text-gray-700">-</Text>
        )}
      </>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Coupon Code"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'couponCode'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('couponCode'),
    dataIndex: 'couponCode',
    key: 'couponCode',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Discount Title"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'discountTitle'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('discountTitle'),
    dataIndex: 'discountTitle',
    key: 'discountTitle',
    width: 200,
    render: (value: string) => {
      return <Text className="font-medium text-gray-700">{value}</Text>;
    },
  },
  {
    title: (
      <HeaderCell
        title="Website Url"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'siteURL'
        }
      />
    ),
    dataIndex: 'siteURL',
    key: 'siteURL',
    width: 200,
    render: (value: string) => {
      return <Text className="font-medium text-gray-700">{value}</Text>;
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: Record<string, string>) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Link href={`${routes.admin.UpdateCouponManagement}/${row._id}`}>
          <Button
            title="Edit Client"
            className="border-[1px] border-black bg-white"
          >
            <PencilIcon className="h-3 w-3 text-xl text-black" />
          </Button>
        </Link>
        <DeletePopover
          title={`Delete the Client`}
          description={`Are you sure you want to delete?`}
          onDelete={() =>
            onDeleteItem(
              row._id,
              currentPage,
              pageSize,
              data?.length <= 1 ? true : false,
              sortConfig,
              searchTerm
            )
          }
        />
      </div>
    ),
  },
];
