'use client';

import { Text } from '@/components/ui/text';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useEffect, useState } from 'react';
import { handleKeyDown } from '@/utils/common-functions';
import { AddTaskSchema, addTaskSchema } from '@/utils/validators/add-task.schema';
import QuillLoader from '@/components/loader/quill-loader';
import { DatePicker } from '@/components/ui/datepicker';
import { postAddTask } from '@/redux/slices/user/task/taskSlice';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { Textarea } from 'rizzui';
import { AddCalenderSchema, addCalenderSchema } from '@/utils/validators/add-calender.schema';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});



const typeOption = [
  { name: 'Team Member', value: 'team_member' },
  { name: 'Admin', value: 'admin' },
]


export default function CalenderCallMettingFrom(props: any) {

  const { title, row } = props;
  // console.log("row data....", row);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();

  const taskData = useSelector(
    (state: any) => state?.root?.task
  );

  const [isTextAreaVisible, setTextAreaVisible] = useState(false);

  const handleAddNoteClick = () => {
    setTextAreaVisible((prevVisible) => !prevVisible);
  };
  const { control } = useForm();
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  const initialValues: AddCalenderSchema = {
    title: '',
    description: '',
    start_date:undefined,
    due_date: undefined,
    client: '',
    assigned: '',
    done: false
  };
  // useEffect(() => {
  //   row && dispatch(getTeamMemberProfile({ _id: row?._id }))
  // }, [row, dispatch]); 

  // let [ data ] = teamMemberData?.teamMember;
  // console.log(data, "dataaaa")

  // let defaultValuess = {
  //   name: data?.name,
  //   email: data?.email,
  //   contact_number: data?.contact_number,
  //   role: data?.member_role
  // };

  const onSubmit: SubmitHandler<AddCalenderSchema> = (dataa) => {
    const formData = {
      ...dataa,
      start_date: new String(dataa?.start_date),
      due_time: new String(dataa?.due_time),
    }
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );

    if (title === 'New Task') {
      dispatch(postAddTask(filteredFormData)).then((result: any) => {
        if(postAddTask.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            closeModal();
            // dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc' }));
          }
        }
      });
    } else {
      // dispatch(editTeamMember({ ...filteredFormData, _id: data._id })).then((result: any) => {
      //   if(editTeamMember.fulfilled.match(result)) {
      //     if (result && result.payload.success === true) {
      //       closeModal();
      //       dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc' }));
      //     }
      //   }
      // });
    }
  };

  // if(!teamMemberData?.teamMember && title === 'Edit Team Member') {
  //   return (
  //     <div className='p-10 flex items-center justify-center'>
  //       <Spinner size="xl" tag='div' className='ms-3' />
  //     </div>
  //   )
  // } else {
  return (
    <>
      <Form<AddCalenderSchema>
        validationSchema={addCalenderSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'all',
          defaultValues: initialValues,
        }}
        className="[&_label]:font-medium"
      >
        {({
          register,
          control,
          formState: { errors, isSubmitSuccessful },
          handleSubmit,
        }) => (
          <div className="space-y-5">
            <div
            // className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4')}
            >
              <div className="grid gap-4">
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  label="Title"
                  placeholder="Enter title"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('title')}
                  error={errors?.title?.message}
                />
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
                <div className={cn('grid grid-cols-2 items-center gap-5 pt-5')}>
                  <div>
                    <Controller
                      name="start_time"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          placeholderText="Select end date & time"
                          selected={value}
                          inputProps={{
                            label: 'Start Time',
                            color: 'info'
                          }}
                          onChange={(date: Date | null) => {
                            onChange(date);
                            setStartDateTime(date);
                          }}
                          selectsEnd
                          startDate={startDateTime}
                          endDate={value}
                          minDate={startDateTime}
                          showTimeSelect
                          dateFormat="MMMM dd, yyyy h:mm aa"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="due_time"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          placeholderText="Select end date & time"
                          selected={value}
                          inputProps={{
                            label: 'End Time',
                            color: 'info'
                          }}
                          onChange={(date: Date | null) => {
                            onChange(date);
                            setEndDateTime(date);
                          }}
                          selectsEnd
                          startDate={startDateTime}
                          endDate={value}
                          minDate={startDateTime}
                          showTimeSelect
                          dateFormat="MMMM dd, yyyy h:mm aa"
                        />
                      )}
                    />
                  </div>
                </div>
                    {startDateTime && endDateTime && (
                      <>
                        <div className='text-lg'>
                          {startDateTime.toLocaleString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                          <span className='px-2 font-bold'>TO:</span>
                          {endDateTime.toLocaleString('en-US', {
                            // month: 'short',
                            // day: '2-digit',
                            // year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </div>
                        </>
                    )}
                <Controller
                  name="client"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={typeOption}
                      value={value}
                      onChange={onChange}
                      label="Client"
                      color="info"
                      error={errors?.client?.message as string}
                      getOptionValue={(option) => option?.name}
                    />
                  )}
                />
                <Controller
                  name="assigned"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={typeOption}
                      value={value}
                      onChange={onChange}
                      label="Assigned"
                      color="info"
                      error={errors?.assigned?.message as string}
                      getOptionValue={(option) => option?.name}
                    />
                  )}
                />
                <span className="flex cursor-pointer items-center text-lg">
                  <AiOutlineUsergroupAdd className="h-[25px] w-[25px]" />
                  <Text>Add Attendees</Text>
                </span>
                <span
                  className="flex cursor-pointer items-center text-lg"
                  onClick={handleAddNoteClick}
                >
                  <GiNotebook className="h-[25px] w-[25px]" />
                  <Text>Add Internal Note & Location</Text>
                </span>
                {isTextAreaVisible && (
                  <Textarea placeholder="Add your internal note and location..." />
                )}
              </div>
            </div>
          </div>
        )}
      </Form>
    </>
  );
  // }

}