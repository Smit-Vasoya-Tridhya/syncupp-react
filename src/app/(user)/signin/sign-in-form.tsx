'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
// import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '@/redux/slices/user/auth/signinSlice';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: false,
};

export default function SignInForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const signIn = useSelector((state: any) => state?.root?.signIn)
  console.log("signIn state.....", signIn)
  


  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log('Sign in data', data);
    dispatch(signInUser(data)).then((result: any) => {
      if (signInUser.fulfilled.match(result)) {
        // console.log('resultt', result)
        if (result && result.payload.success === true ) {
          router.replace(routes.dashboard);
        } 
      }
    })
    // setReset({ ...initialValues, rememberMe: false });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        // resetValues={reset}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              onKeyDown={handleKeyDown}
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              onKeyDown={handleKeyDown}
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            { signIn.loading ? (<Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
              disabled
            >
              Sign in
              <Spinner size="sm" tag='div' className='ms-3' color='white' />
            </Button>) : (<Button
              className="w-full border-2  text-base font-bold"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
            >
              Sign in
            </Button>)
            }
          </div>
        )}
      </Form>
    </>
  );
}
