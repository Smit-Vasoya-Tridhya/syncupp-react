'use client';

import { Title, Text, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
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


const initialValues: AgrementFormTypes = {
    title: '',
    recipient: '',
    due_date: '',
    description: '',
};

export default function ChangePasswordForm() {
    const isMedium = useMedia('(max-width: 1200px)', false);
    const dispatch = useDispatch();
    const router = useRouter();

    const today = new Date();

    const [dueDate, setDueDate] = useState<Date | null>(null);

    const onSubmit: SubmitHandler<AgrementFormTypes> = (data) => {
        console.log(' form data->', data);

    };

    return (
        <>
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
                {({ register, control, formState: { errors } }) => (
                    <div className="space-y-5">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-5 xl:pb-2">
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
                            <Controller
                                control={control}
                                name="recipient"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={peopleCountOptions}
                                        onChange={onChange}
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


                        <div className={cn('grid grid-cols-3 gap-4 pt-5')}>

                            <Button type='button' variant='outline' className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0'><EyeIcon className="h-5 w-5 mr-2" /> Preview</Button>
                            <Button type="submit" className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0'>Save</Button>
                            <Button type='button' variant='outline' className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0'>Send</Button>
                            {/* <Button
                                type="submit"
                                className="hover:gray-700 w-full  @xl:w-auto dark:bg-gray-200 dark:text-white" >
                                Save */}
                            {/* {changePassword.loading && <Spinner size="sm" tag='div' className='ms-3' />} */}
                            {/* </Button> */}
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}
