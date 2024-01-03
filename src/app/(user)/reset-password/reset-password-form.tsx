'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { resetPasswordSchema, ResetPasswordSchema } from '@/utils/validators/reset-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordUser } from '@/redux/slices/user/auth/resetPasswordSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleKeyDown } from '@/utils/common-functions';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';

const initialValues: ResetPasswordSchema = {
  // email: '',
  password: '',
  confirmPassword: ''
};

export default function ResetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});

  useEffect(() => {
    localStorage.clear();
  }, [])
  
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  // console.log("search Params", searchParams.get("email"))

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // console.log("token....", token)

  const router = useRouter();
  const resetPassword = useSelector((state: any) => state?.root?.resetPassword)
  console.log("resetPassword state.....", resetPassword)



  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    console.log('Reset Password data.....', data);
    dispatch(resetPasswordUser({...data, token, email})).then((result: any) => {
      if (resetPasswordUser.fulfilled.match(result)) {
        // console.log('resultt', result)
        if (result && result.payload.success === true ) {
          router.replace(routes.signIn);
        } 
      }
    });
    // setReset({ ...initialValues });
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        onSubmit={onSubmit}
        // resetValues={reset}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            {/* <Input
                type="email"
                size={isMedium ? 'lg' : 'xl'}
                label="Email ID"
                placeholder="Enter your email"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
            /> */}
            <Password
                onKeyDown={handleKeyDown}
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
                onKeyDown={handleKeyDown}
                label="Confirm New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />
            { resetPassword.loading ? (<Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
              disabled
            >
              Reset Password
              <Spinner size="sm" tag='div' className='ms-3' color='white' />
              </Button>) : (<Button
                className="w-full border-2  text-base font-bold"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
              >
                Reset Password
              </Button>)
            }
          </div>
        )}
      </Form>
    </>
  );
}
