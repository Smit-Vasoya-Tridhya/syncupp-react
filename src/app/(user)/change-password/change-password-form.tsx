'use client';

import { Title, Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { routes } from '@/config/routes';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useMedia } from '@/hooks/use-media';
import { Password } from '@/components/ui/password';
import { ChangePasswordSchema, changePasswordSchema } from '@/utils/validators/change-password.schema';
import { useDispatch } from 'react-redux';
import { changePasswordUser } from '@/redux/slices/user/auth/changePasswordSlice';


const initialValues: ChangePasswordSchema = {
  currentPassword: '',
  newPassword: '',
  confirmedPassword: ''
};

export default function ChangePasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    console.log('Change password form data->', data);
    dispatch(changePasswordUser(data));
    setReset({ ...initialValues });
  };

  return (
    <>
      <Form<ChangePasswordSchema>
        validationSchema={changePasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Password
                label="Current Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('currentPassword')}
                error={errors.currentPassword?.message}
              />
            <Password
                label="New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('newPassword')}
                error={errors.newPassword?.message}
              />
            <Password
                label="Confirm New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmedPassword')}
                error={errors.confirmedPassword?.message}
            />
            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
            >
              Change Password
            </Button>
          </div>
        )}
      </Form>
      {/* <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text> */}
    </>
  );
}
