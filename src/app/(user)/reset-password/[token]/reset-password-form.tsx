'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { resetPasswordSchema, ResetPasswordSchema } from '@/utils/validators/reset-password.schema';
import { useDispatch } from 'react-redux';
import { resetPasswordUser } from '@/redux/slices/user/auth/resetPasswordSlice';
import { usePathname } from 'next/navigation';

const initialValues: ResetPasswordSchema = {
  email: '',
  password: '',
  confirmPassword: ''
};

export default function ResetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const dispatch = useDispatch();
  const pathName = usePathname();
  console.log("reset password path....", pathName)

  const token = pathName.slice(16);
  console.log("token....", token)

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    console.log('Reset Password data.....', data);
    dispatch(resetPasswordUser({...data, token}));
    setReset({ ...initialValues });
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        onSubmit={onSubmit}
        resetValues={reset}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
                type="email"
                size={isMedium ? 'lg' : 'xl'}
                label="Email ID"
                placeholder="Enter your email"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
            />
            <Password
                label="New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('password')}
                error={errors.password?.message}
              />
            <Password
                label="Confirm New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />
            <Button
              className="w-full border-2 border-primary-light text-base font-bold"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
