'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import { ProductType } from '@/data/products-data';
import DeletePopover from '@/app/shared/delete-popover';
import CustomModalButton from '@/app/shared/custom-modal-button';
import AddClientForm from '../create-edit/add-client-form';
import { Button } from 'rizzui';

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
        title="Client Name"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('name'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Mobile Number"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'contact_number'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('contact_number'),
    dataIndex: 'contact_number',
    key: 'contact_number',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Email ID"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'email'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('email'),
    dataIndex: 'email',
    key: 'email',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Company"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'reference_id'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('reference_id'),
    dataIndex: 'reference_id',
    key: 'reference_id',
    width: 200,
    render: (value: Record<string, string>) => {
      return <Text className="font-medium text-gray-700">{value?.company_name}</Text>
    },
  },
  {
    title: (
      <HeaderCell
        title="Website"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'reference_id'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('reference_id'),
    dataIndex: 'reference_id',
    key: 'reference_id',
    width: 200,
    render: (value: Record<string, string>) => (
      <Text className="font-medium text-gray-700">{value?.company_website}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
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
        <CustomModalButton 
          title="Edit Client"
          icon={<PencilIcon className="h-4 w-4" />}
          view={<AddClientForm title="Edit Client" row={row} /> }
          customSize="800px"
        />
        <Tooltip
          size="sm"
          content={() => 'View Client'}
          placement="top"
          color="invert"
        >
          {/* <Link href={routes.editTeam}> */}
            <Button size="sm" variant="outline" className='bg-white text-black' aria-label={'View Member'}>
              <EyeIcon className="h-4 w-4" />
            </Button>
          {/* </Link> */}
        </Tooltip>
        <DeletePopover
          title={`Delete the client`}
          description={`Are you sure you want to delete?`}
          onDelete={() => onDeleteItem(row._id)}
        />
      </div>
    ),
  },
];
