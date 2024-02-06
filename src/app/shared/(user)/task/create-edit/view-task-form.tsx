"use client";
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { PiDotsThreeOutlineVerticalFill, PiXBold} from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { Tooltip } from '@/components/ui/tooltip';
import { useModal } from '@/app/shared/modal-views/use-modal';


export default function ViewTaskForm(props: any) {
    const { closeModal } = useModal();
    const { data } = props;

    return (
        <>
            <div className=" h-full w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        <div className="mb-6 flex items-center justify-between p-6">
              <Title as="h3" className="text-xl xl:text-2xl">
                {data?.name}
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
        <div className="flex items-center mt-3">
          <div className="ms-auto">
            <Popover
              placement="left"
              className="z-[99] min-w-[135px] px-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
              content={({ setOpen }) => (
                <div className="px-2 text-gray-900">
                  <Button
                    variant="text"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  >
                    {/* <PiCopySimple className="mr-2 h-5 w-5 text-gray-500" /> */}
                    Pending
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  >
                    {/* <PiShareFat className="mr-2 h-5 w-5 text-gray-500" /> */}
                    Inprogress
                  </Button>
                  <Button
                    variant="text"
                    className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    onClick={() => {
                      // onDeleteItem(item.id);
                      setOpen(false);
                    }}
                  >
                    {/* <PiTrashSimple className="mr-2 h-5 w-5 text-gray-500" /> */}
                    Completed
                  </Button>
                </div>
              )}
            >
              <ActionIcon title={'More Options'} variant="text">
                <PiDotsThreeOutlineVerticalFill className="h-5 w-5 text-gray-500" />
              </ActionIcon>
            </Popover>
          </div>
        </div>

        <div>
          <Title
            as="h4"
            className="ps-4 my-3 truncate text-[13px] font-medium text-gray-800"
          >
            {data?.date}
          </Title>
        </div>
        <div className="ps-3 my-3 flex items-center justify-start gap-3">
          <Tooltip
            size="sm"
            content={() => data?.assigned_by}
            placement="top"
            color="invert"
          >
            <ActionIcon variant="text">
              <BsPersonFill size='25px' />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => data?.assigned_to}
            placement="top"
            color="invert"
          >
            <ActionIcon variant="text">
              <FaPeopleGroup size='25px' />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
        </>
    );
}



