'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import { TeamMemberType } from '@/data/products-data';
import DeletePopover from '@/app/shared/delete-popover';
import CustomModalButton from '@/app/shared/custom-modal-button';
import { Badge, Button } from 'rizzui';
import moment from 'moment';
import AddTaskForm from '../create-edit/add-task-form';
import { useSelector } from 'react-redux';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string | string[], currentPage?: any, countPerPage?: number, Islastitem?: boolean, sortConfig?: Record<string, string>, searchTerm?: string) => void;
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
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
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

export const GetColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  currentPage,
  pageSize,
  searchTerm
}: Columns) => {

  const signIn = useSelector((state: any) => state?.root?.signIn)

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
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Task Name"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'title'
          }
        />),
      onHeaderCell: () => onHeaderCellClick('title'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
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
        />),
      onHeaderCell: () => onHeaderCellClick('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Deadline"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'due_date'
          }
        />),
      onHeaderCell: () => onHeaderCellClick('due_date'),
      dataIndex: 'due_date',
      key: 'due_date',
      width: 200,
      render: (value: any) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Client"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'client_name'
          }
        />),
      onHeaderCell: () => onHeaderCellClick('client_name'),
      dataIndex: 'client_name',
      key: 'client_name',
      width: 200,
      render: (value: any) => (
        <Text className="font-medium text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Assigned By"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'assigned_by_name'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('assigned_by_name'),
      dataIndex: 'assigned_by_name',
      key: 'assigned_by_name',
      width: 200,
      render: (value: string) => {
        // const date = moment(value).fromNow();
        return <Text className="font-medium text-gray-700">{value}</Text>
      },
    },
    {
      title: (
        <HeaderCell
          title="Assigned To"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'assign_to_name'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('assign_to_name'),
      dataIndex: 'assign_to_name',
      key: 'assign_to_name',
      width: 200,
      render: (value: string) => {
        // const date = moment(value).fromNow();
        return <Text className="font-medium text-gray-700">{value}</Text>
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
        />),
      onHeaderCell: () => onHeaderCellClick('status'),
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (value: string) => getStatusBadge(value),
      // render: (_: any, row: any) => (
      //   <Text className="font-medium text-gray-700">{row.status}</Text>
      // ),
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: TeamMemberType) => {
        return (
          <div>
            {signIn?.role !== 'client' &&
              <div className="flex items-center justify-end gap-3 pe-4">
                <CustomModalButton
                  icon={<PencilIcon className="h-4 w-4" />}
                  view={<AddTaskForm title="Edit Task" row={row} />}
                  customSize="925px"
                  title='Edit Task'
                />
                <Tooltip
                  size="sm"
                  content={() => 'View Task'}
                  placement="top"
                  color="invert"
                >
                  <Button size="sm" variant="outline" className='bg-white text-black' aria-label={'View Member'}>
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </Tooltip>
                <DeletePopover
                  title={`Delete the Task`}
                  description={`Are you sure you want to delete?`}
                  onDelete={() => onDeleteItem(row._id, currentPage, pageSize, data?.length <= 1 ? true : false, sortConfig, searchTerm)}
                />
              </div>
            }
          </div>
        );
      },
    },
  ];
}
