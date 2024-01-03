'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useEffect, useState } from 'react';
import { postSignin } from '@/redux/slices/admin/auth/signin/signinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
// import api from '@/app/api/api';

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
  const adminSignIn = useSelector((state: any) => state?.root?.adminSignIn)
  console.log("adminSignIn state.....", adminSignIn)

  useEffect(()=> {
    if(adminSignIn.userData.success === true){
      router.replace('/admin/dashboard')
    }
  }, [router, adminSignIn]);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const requestObject = {
      ...data,
    }
    dispatch(postSignin(requestObject))
    // setReset({...initialValues})
    console.log('Sign in data', data);
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
                href={routes.admin.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            { adminSignIn.loading ? (<Button
              className="w-full border-2 border-primary-light text-base font-bold"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
              disabled
            >
              Sign in
              <Spinner size="sm" tag='div' className='ms-3' color='white' />
            </Button>):(
              <Button
              className="w-full border-2 border-primary-light text-base font-bold"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
            >
              Sign in
            </Button>
            )}
          </div>
        )}
      </Form>
    </>
  );
}
