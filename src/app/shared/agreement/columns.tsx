'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import DeletePopover from '@/app/shared/delete-popover';
import { useDispatch } from 'react-redux';
import CustomModalButton from '../custom-modal-button';
import PencilIcon from '@/components/icons/pencil';
import AddClientForm from '../(user)/client/create-edit/add-client-form';
import { ActionIcon, Button, Popover, Tooltip } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import { AiOutlineFilePdf } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { PiDotsThreeVerticalBold, PiXBold } from 'react-icons/pi';
import TrashIcon from '@/components/icons/trash';
import { RiDraftLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import moment from 'moment';
import { downloadAgreement, sendAgreement } from '@/redux/slices/user/agreement/agreementSlice';



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


export const AgreementColumns = ({
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
                    title="Title"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'title'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('title'),
            dataIndex: 'title',
            key: 'title',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="RECEIVER"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'receiver'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('receiver'),
            dataIndex: 'receiver',
            key: 'receiver',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="DUEDATE"
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
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? moment(value).format("Do MMM. ‘YY") : "-"}</Text>
            ),
        },

        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: <HeaderCell
                title="STATUS"
                sortable
                ascending={
                    sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
                } />,
            onHeaderCell: () => onHeaderCellClick('status'),
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (_: string, row: Record<string, string>) => (
                <div className="flex items-center justify-end gap-3 pe-4">
                    <Popover
                        placement="left"
                        className="z-50 min-w-[140px] px-0"
                        content={({ setOpen }) => (
                            <div className="text-gray-700">
                                <Button
                                    variant="text"
                                    className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
                                    onClick={() => setOpen(false)}
                                >
                                    <RiDraftLine className="me-2 h-[18px] w-[18px] text-gray-500" />
                                    Draft
                                </Button>
                                <Button
                                    variant="text"
                                    className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
                                    onClick={() => setOpen(false)}
                                >
                                    <FiSend className="me-2 h-[18px] w-[18px] text-gray-500" />
                                    Sent
                                </Button>
                                <Button
                                    variant="text"
                                    className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
                                    onClick={() => setOpen(false)}
                                >
                                    <FaRegCheckCircle className="me-2 h-[18px] w-[18px] text-gray-500" />
                                    Agreed
                                </Button>
                            </div>
                        )}
                    >
                        <ActionIcon variant="text" className='text-center'>
                            <Button type='button'>{row?.status}</Button>
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
                    <CustomModalButton
                        title="Edit Agreement"
                        icon={<PencilIcon className="h-4 w-4" />}
                        view={<AddClientForm title="Edit Agreement" row={row} />}
                        customSize="800px"
                    />
                    <Tooltip
                        size="sm"
                        content={() => 'View Agreement'}
                        placement="top"
                        color="invert"
                    >
                        <Link href={`/agreement/${row?._id}`}>
                            <Button type='button' size="sm" variant="outline" className='bg-white text-black' aria-label={'View Agreement'}>
                                <EyeIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                    </Tooltip>
                    <Tooltip
                        size="sm"
                        content={() => 'Download PDF'}
                        placement="top"
                        color="invert"
                    >
                        <Button size="sm" type='button' onClick={() => { dispatch(downloadAgreement(row?._id)) }} variant="outline" className='bg-white text-black' aria-label={'Download PDF'}>
                            <AiOutlineFilePdf className="h-4 w-4" />
                        </Button>
                    </Tooltip>
                    <Tooltip
                        size="sm"
                        content={() => 'Send Email'}
                        placement="top"
                        color="invert"
                    >
                        {/* <Link href={routes.editTeam}> */}
                        <Button type='button' onClick={() => { dispatch(sendAgreement(row?._id)) }} size="sm" variant="outline" className='bg-white text-black' aria-label={'Send Email'}>
                            <HiOutlineMail className="h-4 w-4" />
                        </Button>
                        {/* </Link> */}
                    </Tooltip>
                    <DeletePopover
                        title={`Delete the Agreement`}
                        description={`Are you sure you want to delete?`}
                        onDelete={() => onDeleteItem([row._id], currentPage, pageSize, data?.length <= 1 ? true : false, sortConfig, searchTerm)}
                    />
                </div>
            ),
        },
    ];
}
