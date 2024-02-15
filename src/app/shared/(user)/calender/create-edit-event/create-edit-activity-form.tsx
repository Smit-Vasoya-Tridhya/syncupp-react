'use client';
import { Title, ActionIcon, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { useState } from 'react';
import EventCalendarDayView from './calendar-day-view';
import AddTaskForm from './task-form';
import { FaRegCalendarAlt } from 'react-icons/fa';
import AddCallMeetingForm from './call-meeting-form';
import AddOtherForm from './other-form';


const menuItems = [
  {
    label: 'Task',
  },
  {
    label: 'Call meeting',
  },
  {
    label: 'Others',
  },
];

export default function AddActivityFormPage(props: any) {

  const { title, row } = props;
  // console.log("row data....", row);

  const dispatch = useDispatch();
  const router = useRouter();
  const { closeModal } = useModal();
  const [selectedTask, setSelectedTask] = useState('Task');

  const taskData = useSelector(
    (state: any) => state?.root?.task
  );


  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  return (
    <>
      <div className="space-y-5 p-10">
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
                {/* <div className="grid grid-cols-[repeat(3,1fr)] w-full bg-gray-100 cursor-pointer">
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
                    </div> */}
                <div className='border-b-[1px]'>
                  {menuItems.map((menu, index) => (
                    <Button
                      key={index}
                      className={cn(
                        'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5  before:bg-gray-1000 before:transition-all hover:text-gray-900',
                        menu.label === selectedTask
                          ? 'before:visible before:w-full before:opacity-100'
                          : 'before:invisible before:w-0 before:opacity-0'
                      )}
                      variant='text'
                      onClick={() => handleTaskClick(menu.label)}
                    >
                      <Text
                        as="span"
                        className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70"
                      >
                        {menu.label}
                      </Text>
                    </Button>
                  ))}
                </div>
                <div className="mt-3">
                  {selectedTask === 'Task' && (
                    <AddTaskForm title={title} className="w-full p-0" />
                  )}
                  {selectedTask === 'Call meeting' && (
                    <div className="h-full">
                      <AddCallMeetingForm title={title} />
                    </div>
                  )}
                  {selectedTask === 'Others' && (
                    <div>
                      <AddOtherForm title={title}  />
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <EventCalendarDayView />
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );

}
