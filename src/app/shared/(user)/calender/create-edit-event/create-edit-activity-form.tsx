'use client';

import { Title, ActionIcon, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiNotepadDuotone, PiPhoneCallDuotone, PiXBold } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useEffect, useState } from 'react';
import { AddTaskSchema, addTaskSchema } from '@/utils/validators/add-task.schema';
import QuillLoader from '@/components/loader/quill-loader';
import EventCalendarView from './calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { postAddTask } from '@/redux/slices/user/task/taskSlice';
import AddTaskForm from './task-form';
import CalenderOtherFrom from './other-form';
import CalenderCallMettingFrom from './call-metting-form';
import { FaRegCalendarAlt } from 'react-icons/fa';

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


export default function AddTaskFormPage(props: any) {

  const { title, row } = props;
  // console.log("row data....", row);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();

  const taskData = useSelector(
    (state: any) => state?.root?.task
  );

  const [selectedTask, setSelectedTask] = useState('task');
  const handleTaskClick = (task:any) => {
    setSelectedTask(task);
  };

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
            // dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
          }
        }
      });
    } else {
      // dispatch(editTeamMember({ ...filteredFormData, _id: data._id })).then((result: any) => {
      //   if(editTeamMember.fulfilled.match(result)) {
      //     if (result && result.payload.success === true) {
      //       closeModal();
      //       dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
      //     }
      //   }
      // });
    }
  };
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
        {({
          register,
          control,
          formState: { errors, isSubmitSuccessful },
          handleSubmit,
        }) => (
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
            <div>
              <>
                <div
                  className={cn(
                    'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
                  )}
                >
                  <div>
                    <div className="grid grid-cols-[repeat(3,1fr)] w-full bg-gray-100 cursor-pointer">
                      <div className={`inline-flex gap-2 items-center text-[17px] p-3 ${selectedTask === 'task' ? 'bg-gray-500 text-white' : ``}`} onClick={() => handleTaskClick('task')}>
                          <PiNotepadDuotone className="h-[25px] w-[25px]" />
                          <Text>Task</Text>
                      </div>
                      <div  className={`inline-flex gap-2 items-center text-[17px] p-3 ${selectedTask === 'meeting' ? 'bg-gray-500 text-white' : ``}`} onClick={() => handleTaskClick('meeting')}>
                          <PiPhoneCallDuotone className="h-[25px] w-[25px]" />
                          <Text>Call Meeting</Text>
                      </div>
                      <div  className={`inline-flex gap-2 items-center text-[17px] p-3 ${selectedTask === 'others' ? 'bg-gray-500 text-white' : ``}`} onClick={() => handleTaskClick('others')}>
                      <FaRegCalendarAlt className="h-[25px] w-[25px]"/>
                        <Text className="cursor-pointer">Others</Text>
                      </div>
                    </div>
                    <div className="mt-3">
                      {selectedTask === 'task' && (
                        <AddTaskForm className="w-full p-0" />
                      )}
                      {selectedTask === 'others' && (
                        <div>
                          <CalenderOtherFrom />
                        </div>
                      )}
                      {selectedTask === 'meeting' && (
                        <div className="h-full">
                          <CalenderCallMettingFrom />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <EventCalendarView />
                  </div>
                </div>
              </>
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
                <div className="flex items-center justify-end gap-2">
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
