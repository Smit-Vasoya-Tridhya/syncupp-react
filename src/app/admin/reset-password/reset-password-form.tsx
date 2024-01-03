'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Input } from '@/components/ui/input';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import {resetPasswordSchema,ResetPasswordSchema} from '@/utils/validators/reset-password.schema';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { postResetPassword } from '@/redux/slices/admin/auth/resetpassword/resetPasswordSlice';
import useMedia from 'react-use/lib/useMedia';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleKeyDown } from '@/utils/common-functions';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function ResetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  // console.log("search Params", searchParams.get("email"))

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // console.log("token....", token)

  const router = useRouter();
  const adminResetPassword = useSelector((state: any) => state?.root?.adminResetPassword)
  console.log("adminResetPassword state.....", adminResetPassword)

  useEffect(()=> {
    if(adminResetPassword.data.success === true){
      router.replace('/admin/signin')
    }
  }, [router, adminResetPassword]);

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    const requestObject = {
      ...data,
      token,
      email
    }
    dispatch(postResetPassword(requestObject))

    // console.log(data);
    // toast.success(
    //   <Text className='ml-14'>
    //     Password reset successfully
    //   </Text>
    // );
    // setReset(initialValues);
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          // mode: 'onChange',
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Password
              onKeyDown={handleKeyDown}
              label="New Password"
              placeholder="Enter New password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              rounded="pill"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              onKeyDown={handleKeyDown}
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              rounded="pill"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Button
              className="mt-2 w-full"
              type="submit"
              size="lg"
              color="info"
              rounded="pill"
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{' '}
        <Link
          href={routes.admin.signIn}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
