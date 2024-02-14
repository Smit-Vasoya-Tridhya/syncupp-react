'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
//import AddClientForm from '../create-edit/add-client-form';
import { Badge, Button } from 'rizzui';
import { routes } from '@/config/routes';
import jsonData from '../../../../locales/en/translation.json';
import CustomeDeletePopover from './customeDelete';

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
        title="Seat No"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'seat_No'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('seat_No'),
    dataIndex: 'seat_No',
    key: 'seat_No',
    width: 200,
    render: (value: string, row: any) => {
      // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      return (
        <Text className="font-medium capitalize text-gray-700">{value}</Text>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title="Allocated To"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'Allocated_To'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('Allocated_To'),
    dataIndex: 'Allocated_To',
    key: 'Allocated_To',
    width: 200,
    render: (value: string) => (
      <>
        <Text className="font-medium text-gray-700">{value}</Text>
      </>
    ),
  },
  {
    title: (
      <HeaderCell
        title="User Type"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'user_type'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('user_type'),
    dataIndex: 'user_type',
    key: 'user_type',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
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
    render: (value: string) => {
      return (
        <Text className="font-medium  capitalize text-gray-700">{value}</Text>
      );
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
        <CustomeDeletePopover
          title="Delete the User"
          description={'Are you sure you want to delete'}
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
          text="remove user"
        />
      </div>
    ),
  },
];
