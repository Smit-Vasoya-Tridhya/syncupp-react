'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import { Button, Switch } from 'rizzui';
import { useDispatch } from 'react-redux';
import { deleteAgency, getAllAgency } from '@/redux/slices/admin/agency/agencySlice';

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
    searchTerm
}: Columns) => {

    const dispatch = useDispatch();

    const handleSwitchChange = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event?.target?.checked, 'event')
        try {
            const res = await dispatch(deleteAgency({ agencies: id, status: event?.target?.checked }));
            if (res.payload.success === true) {
                const reponse = await dispatch(getAllAgency({ page: currentPage, items_per_page: pageSize, sort_field: sortConfig?.key, sort_order: sortConfig?.direction }));
                console.log("response after delete...", reponse)
            }
        } catch (error) {
            console.error(error);
        }

    };

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
                    title="Firs Name"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'first_name'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('first_name'),
            dataIndex: 'first_name',
            key: 'first_name',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Last Name"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'last_name'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('last_name'),
            dataIndex: 'last_name',
            key: 'last_name',
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
                <Text className="font-medium text-gray-700">93453486578</Text>
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
            render: (value: string) => {
                return <Text className="font-medium text-gray-700">{value}</Text>
            },
        },
        {
            title: (
                <HeaderCell
                    title="Company"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'company'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('company'),
            dataIndex: 'company',
            key: 'company',
            width: 200,
            render: (value: Record<string, string>) => (
                <Text className="font-medium text-gray-700">Company</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Website"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'website'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('website'),
            dataIndex: 'website',
            key: 'website',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">Website</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Industry"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'Industry'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('Industry'),
            dataIndex: 'Industry',
            key: 'Industry',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">Industry</Text>
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
            render: (value: string, row: Record<string, string>) => (
                // <Text className="font-medium text-gray-700">{value}</Text>
                <Switch className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium" variant='active' onChange={(event) => handleSwitchChange(row._id, event)} disabled={value == "pending"} defaultChecked={!!value} />
            ),
        },
        {
            title: (
                <HeaderCell
                    title="# Of employees"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === '# Of employees'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('# Of employees'),
            dataIndex: '# Of employees',
            key: '# Of employees',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700"># Of employees</Text>
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
                    <DeletePopover
                        title={`Delete the client`}
                        description={`Are you sure you want to delete?`}
                        onDelete={() => onDeleteItem(row._id, currentPage, pageSize, data?.length <= 1 ? true : false, sortConfig, searchTerm)}
                    />
                </div>
            ),
        },
    ];
}
