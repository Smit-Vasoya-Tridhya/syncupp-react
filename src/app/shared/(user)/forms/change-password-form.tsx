'use client';

import { Title, Text, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useMedia } from '@/hooks/use-media';
import { Password } from '@/components/ui/password';
import { ChangePasswordSchema, changePasswordSchema } from '@/utils/validators/change-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordUser } from '@/redux/slices/user/auth/changePasswordSlice';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';


const initialValues: ChangePasswordSchema = {
  currentPassword: '',
  newPassword: '',
  confirmedPassword: ''
};

export default function ChangePasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();

  const changePassword = useSelector((state: any) => state?.root?.changePassword)
  // console.log("changePassword state.....", changePassword)


  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    console.log('Change password form data->', data);
    dispatch(changePasswordUser(data)).then((result: any) => {
      if (changePasswordUser.fulfilled.match(result)) {
        // console.log('resultt', result)
        if (result && result.payload.success === true ) {
          // router.replace(routes.dashboard);
          closeModal();
        } 
      }
    })
  };

  return (
    <>
      <Form<ChangePasswordSchema>
        validationSchema={changePasswordSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
        className=" [&_label]:font-medium p-10"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                Change Password
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
            <Password
                onKeyDown={handleKeyDown}
                label="Current Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('currentPassword')}
                error={errors.currentPassword?.message}
              />
            <Password
                onKeyDown={handleKeyDown}
                label="New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('newPassword')}
                error={errors.newPassword?.message}
              />
            <Password
                onKeyDown={handleKeyDown}
                label="Confirm New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmedPassword')}
                error={errors.confirmedPassword?.message}
            />
            <div className={cn('grid grid-cols-2 gap-4 pt-5')}>
                <Button
                  variant="outline"
                  className="w-full @xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="hover:gray-700 w-full  @xl:w-auto dark:bg-gray-200 dark:text-white"
                  disabled={changePassword.loading}
                >
                  Save
                  {changePassword.loading && <Spinner size="sm" tag='div' className='ms-3' />}
                </Button>
              </div>
          </div>
        )}
      </Form>
    </>
  );
}
