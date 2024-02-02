'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import { Button, Tooltip } from 'rizzui';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <HeaderCell
          title="ACTIVITY"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'activity'
          }
        />
      </div>
    ),
    onHeaderCell: () => onHeaderCellClick('activity'),
    dataIndex: 'activity',
    key: 'activity',
    width: 200,
    render: (value: string) => (
      <Text className="inline-flex ps-3.5 font-medium text-gray-700">
        {value}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="DATE"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('date'),
    dataIndex: 'date',
    key: 'date',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="CUSTOMER"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'customer'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('customer'),
    dataIndex: 'customer',
    key: 'customer',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="ASIGN TO"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'assigned'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('assigned'),
    dataIndex: 'assigned',
    key: 'assigned',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
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
          content={() => 'View Agreement'}
          placement="top"
          color="invert"
        >
          <Link href={`/client/agreement/${row?._id}`}>
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-black"
              aria-label={'View Agreement'}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Cancle`}
          description={`Are you sure you want to Cancle?`}
          onDelete={() => onDeleteItem(row._id)}
        />
      </div>
    ),
  },
];
