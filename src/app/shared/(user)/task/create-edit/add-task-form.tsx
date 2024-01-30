'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useEffect, useState } from 'react';
import { handleKeyContactDown, handleKeyDown } from '@/utils/common-functions';
// import SelectBox from '@/components/ui/select';
import { AddTaskSchema, addTaskSchema } from '@/utils/validators/add-task.schema';
import QuillLoader from '@/components/loader/quill-loader';
import { DatePicker } from '@/components/ui/datepicker';
import EventCalendarView from './calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { postAddTask } from '@/redux/slices/user/task/taskSlice';

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


export default function AddTaskForm(props: any) {

  const { title, row } = props;
  // console.log("row data....", row);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();

  const taskData = useSelector(
    (state: any) => state?.root?.task
  );




  // let data = row;

  const initialValues: AddTaskSchema = {
    title: '',
    description: '',
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




  const onSubmit: SubmitHandler<AddTaskSchema> = (dataa) => {
    console.log('Add task dataa---->', dataa);

    const formData = {
      ...dataa,
      due_date: new String(dataa?.due_date),
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
      <Form<AddTaskSchema>
        validationSchema={addTaskSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'all',
          defaultValues: initialValues,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors, isSubmitSuccessful }, handleSubmit }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                {title}
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>
            <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4')}>
              <div className='grid gap-4'>
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
                <div className={cn('grid grid-cols-2 gap-5 pt-5')}>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        inputProps={{
                          label: 'Due Date',
                          color: 'info'
                        }}
                        placeholderText='Select due date'
                        onChange={onChange}
                        selectsStart
                        startDate={value}
                        minDate={new Date()}
                        dateFormat="MMMM d, yyyy"
                      />
                    )}
                  />
                  <Controller
                    name="due_time"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        inputProps={{
                          label: 'Due Time',
                          color: 'info'
                        }}
                        placeholderText='Select due time'
                        onChange={onChange}
                        showTimeSelect
                        showTimeSelectOnly
                        dateFormat="h:mm aa"
                      />
                    )}
                  />
                </div>
                <Controller
                  name="client"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={typeOption}
                      value={value}
                      onChange={onChange}
                      label="Client"
                      color= 'info'
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
                      color= 'info'
                      error={errors?.assigned?.message as string}
                      getOptionValue={(option) => option?.name}
                    />
                  )}
                />
              </div>
              <div className='grid gap-4'>
                <EventCalendarView />
              </div>
            </div>
            <div>
              <div className={cn('grid grid-cols-2 gap-5 pt-5')}>
                <div>
                  <Button
                    variant="outline"
                    className="@xl:w-auto dark:hover:border-gray-400"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                </div>
                <div className='flex justify-end items-center gap-2'>
                    <Checkbox
                    {...register('done')}
                    label="Mark as done"
                    color="info"
                    variant="flat"
                    className="[&>label>span]:font-medium"
                  />
                  <Button
                    type="submit"
                    className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                  // disabled={(teamMemberData?.addTeamMemberStatus === 'pending' || teamMemberData?.editTeamMemberStatus === 'pending') && save}
                  >
                    Save
                    {/* { (teamMemberData?.addTeamMemberStatus === 'pending' || teamMemberData?.editTeamMemberStatus === 'pending') && save && (<Spinner size="sm" tag='div' className='ms-3' color='white' />)  } */}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Form>
    </>
  );
  // }

}
