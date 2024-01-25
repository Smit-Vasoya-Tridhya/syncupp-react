'use client';

import { Title, Text, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useMedia } from '@/hooks/use-media';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@/components/ui/datepicker';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import cn from '@/utils/class-names';
import { AgrementFormTypes, agrementFormSchema } from '@/utils/validators/agreement.schema';
import { Input } from 'rizzui';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import QuillLoader from '@/components/loader/quill-loader';
import PageHeader from '@/app/shared/page-header';
import EyeIcon from '@/components/icons/eye';
import { createagreement, getDropdownclientlist } from '@/redux/slices/user/agreement/agreementSlice';

const Select = dynamic(() => import('@/components/ui/select'), {
    ssr: false,
    loading: () => <SelectLoader />,
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
    ssr: false,
    loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

const peopleCountOptions = [
    { name: '1-50', value: '1-50' },
    { name: '51-200', value: '51-200' },
    { name: '201-500', value: '201-500' },
    { name: '501-1000', value: '501-1000' },
]


export default function ChangePasswordForm() {

    const isMedium = useMedia('(max-width: 1200px)', false);
    const dispatch = useDispatch();
    const router = useRouter();

    const { user } = useSelector((state: any) => state?.root?.signIn?.user?.data);
    const { clientlistDetails, loading } = useSelector((state: any) => state?.root?.agreement);
    console.log(clientlistDetails?.data?.client, 'clientlistDetails')

    const clientOptions =
        clientlistDetails?.data?.client && clientlistDetails?.data?.client?.length > 0 ? clientlistDetails?.data?.client?.map((client: any) => ({
            name: client?.name,
            value: client?._id,
            key: client
        })) : [];


    // Get Today date
    const today = new Date();

    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [preview, setpreview] = useState(false);
    const [sendbuttonflag, setsendbuttonflag] = useState<boolean>(false)
    const [selectedClient, setselectedClient] = useState<any>(null)
    const [formdata, setformData] = useState({
        title: '',
        recipient: '',
        due_date: '',
        description: '',
    })

    useEffect(() => {
        dispatch(getDropdownclientlist())
    }, [])

    // initial value State
    const initialValues: AgrementFormTypes = {
        title: formdata?.title,
        recipient: formdata?.recipient,
        due_date: formdata?.due_date,
        description: formdata?.description,
    };


    // onSubmit Handler
    const onSubmit: SubmitHandler<AgrementFormTypes> = (data) => {
        const agreementData = {
            client_id: user?._id,
            title: data?.title,
            receiver: selectedClient?.value,
            due_date: data?.due_date,
            agreement_content: data?.description,
            send: sendbuttonflag
        };

        // If in preview mode, dispatch the API call
        dispatch(createagreement(agreementData)).then((result: any) => {
            if (createagreement.fulfilled.match(result) && result.payload.success === true) {
                router.replace(`/agreement`);

            }
        });
        setsendbuttonflag(false)


    };

    const SendHandler = () => {
        setsendbuttonflag(true)
    }

    //Preview mode Handler
    const handlePreview = (watch: any) => {
        // Toggle to preview mode
        setpreview(!preview);
        setformData(watch())
    };

    console.log(preview, 'preview')

    return (
        <>

            {/* Agreement forms */}
            {!preview && <>
                <PageHeader title="Agreement" />
                <Form<AgrementFormTypes>
                    validationSchema={agrementFormSchema}
                    onSubmit={onSubmit}
                    useFormProps={{
                        defaultValues: initialValues,
                        mode: "all"
                    }}
                    className=" [&_label]:font-medium p-10"
                >
                    {({ register, control, formState: { errors }, watch, handleSubmit }) => (

                        console.log(watch(), 'watch'),
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-5 xl:pb-2 items-start">
                                <Input
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    // size={isMedium ? 'lg' : 'xl'}
                                    label="Enter Title"
                                    placeholder="Website Agreement"
                                    // rounded="pill"
                                    color="info"
                                    className="[&>label>span]:font-medium  w-full"
                                    {...register('title')}
                                    error={errors.title?.message}
                                />
                                {/* <Controller
                                    control={control}
                                    name="recipient"
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            options={clientOptions}
                                            // onChange={onChange}
                                            onChange={(selectedOption: any) => {
                                                setselectedClient(selectedOption);
                                                onChange(selectedOption?._id); // Make sure to handle null case
                                            }}
                                            value={value}
                                            // size={isMedium ? 'lg' : 'xl'}
                                            label="Recipient*"
                                            // rounded="pill"
                                            color="info"
                                            getOptionValue={(option) => option.value}
                                            dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                                            className="font-medium"
                                            error={errors?.recipient?.message}
                                        />
                                    )}
                                /> */}
                                <Controller
                                    control={control}
                                    name="recipient"
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            options={clientOptions}
                                            onChange={(selectedOption: any) => {
                                                console.log(selectedOption, 'selectedOption', value)
                                                setselectedClient(selectedOption);
                                                onChange(selectedOption?.name);
                                            }}
                                            value={value}
                                            label="Recipient*"
                                            color="info"
                                            // Remove getOptionLabel and getOptionValue props
                                            dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                                            className="font-medium"
                                            error={errors?.recipient?.message}
                                        />
                                    )}
                                />
                                <div className="flex flex-col">
                                    <label htmlFor="due_date" className="font-medium text-gray-700 dark:text-gray-600 mb-1.5">
                                        Due Date
                                    </label>
                                    <Controller
                                        name="due_date"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                selected={dueDate}
                                                onChange={(date: Date) => {
                                                    setDueDate(date);
                                                    onChange(date.toISOString()); // convert date to string
                                                }}
                                                minDate={today}
                                                placeholderText="Select Date"
                                            />
                                        )}
                                    />
                                    {errors.due_date && <span className="text-red-500">{errors.due_date.message}</span>}
                                </div>
                            </div>
                            <Controller
                                control={control}
                                name="description"
                                render={({ field: { onChange, value } }) => (
                                    <QuillEditor
                                        value={value}
                                        onChange={onChange}
                                        label="Description"
                                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                    />
                                )}
                            />
                            <div className='flex justify-between mt-5 font-medium text-gray-700 dark:text-gray-600 mb-1.5'>
                                <ul>
                                    <li>{user?.first_name}</li>
                                    <li>{user?.email}</li>
                                    <li>{user?.contact_number}</li>
                                </ul>
                                <ul>
                                    <li>{selectedClient?.key?.name && selectedClient?.key?.name != "" ? selectedClient?.key?.name : "[Receiver Name]"}</li>
                                    <li>{selectedClient?.key?.email && selectedClient?.key?.email != "" ? selectedClient?.key?.email : "[Receiver Email]"}</li>
                                    <li>{selectedClient?.key?.contact_number && selectedClient?.key?.contact_number != "" ? selectedClient?.key?.contact_number : "[Receiver Phone]"}</li>
                                </ul>
                            </div>


                            <div className="flex justify-end space-x-4 mt-90">
                                <Button type="button" onClick={() => { handlePreview(watch) }} variant="outline" className="bg-none text-xs sm:text-sm">
                                    <EyeIcon className="h-5 w-5 mr-2" />
                                    Preview
                                </Button>
                                <Button disabled={loading} type="submit" className="bg-none text-xs sm:text-sm">
                                    Save
                                </Button>
                                <Button type="submit" onClick={SendHandler} variant="outline" className="bg-none text-xs sm:text-sm">
                                    Send
                                </Button>
                                {/* Add your disabled button here if needed */}
                            </div>

                        </div>
                    )}
                </Form>
            </>}

            {/* Priview of Agreement */}
            {preview && <>
                <h3 className='flex justify-between items-center border-2 rounded border-solid border-gray-300 bg-gray-100 p-3'>
                    <span>Introduction</span>
                    <Button type="button" onClick={() => { setpreview(false) }} className="bg-none text-xs sm:text-sm">
                        Back
                    </Button>
                </h3>
                <div className='mt-5' dangerouslySetInnerHTML={{ __html: formdata?.description }} />
                <div className='flex justify-between mt-5 font-medium text-gray-700 dark:text-gray-600 mb-1.5'>
                    <ul>
                        <li>{user?.first_name}</li>
                        <li>{user?.email}</li>
                        <li>{user?.contact_number}</li>
                    </ul>
                    <ul>
                        <li>{selectedClient?.key?.name && selectedClient?.key?.name != "" ? selectedClient?.key?.name : "[Receiver Name]"}</li>
                        <li>{selectedClient?.key?.email && selectedClient?.key?.email != "" ? selectedClient?.key?.email : "[Receiver Email]"}</li>
                        <li>{selectedClient?.key?.contact_number && selectedClient?.key?.contact_number != "" ? selectedClient?.key?.contact_number : "[Receiver Phone]"}</li>
                    </ul>
                </div>
            </>}
        </>
    );
}
