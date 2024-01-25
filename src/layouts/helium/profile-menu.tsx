'use client';

import ModalButton from '@/app/shared/modal-button';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { logoutUser } from '@/redux/slices/user/auth/signinSlice';
import { logoutUserSignUp } from '@/redux/slices/user/auth/signupSlice';
import cn from '@/utils/class-names';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import "./style.css"
import ChangePasswordForm from '@/app/shared/(user)/forms/change-password-form';

const menuItems = [
  // {
  //   name: 'My Profile',
  //   href: routes.signIn,
  // },
  // {
  //   name: 'Change Password',
  //   href: routes.changePassword,
  // },
  // {
  //   name: 'Activity Log',
  //   href: routes.signIn,
  // },
];

function DropdownMenu() {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    router.replace('/signin');
    dispatch(logoutUser())
    dispatch(logoutUserSignUp())
    localStorage.clear();
  }

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp"
          name="Albert Flores"
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            Albert Flores
          </Title>
          <Text className="text-gray-600">flores@doe.io</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {/* <ModalButton
          label="View Profile"
          view={<ViewProfileForm />}
          customSize="625px"
          className="mt-0 justify-start mb-3 text-gray-900 bg-white "
        /> */}
        <ModalButton
          label="Change Password"
          view={<ChangePasswordForm />}
          customSize="625px"
          className="mt-0 justify-start text-gray-900 bg-white"
        />
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start ml-2 p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleClick}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button
        className={cn(
          'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
          buttonClassName
        )}
      >
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp"
          name="John Doe"
          color="invert"
          className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
        />
      </button>
    </Popover>
  );
}
