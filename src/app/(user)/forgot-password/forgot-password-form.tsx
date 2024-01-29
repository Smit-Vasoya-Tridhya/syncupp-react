'use client';

import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import Link from 'next/link';
import {forgetPasswordSchema, ForgetPasswordSchema} from '@/utils/validators/forget-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordUser } from '@/redux/slices/user/auth/forgotPasswordSlice';
import { handleKeyDown } from '@/utils/common-functions';
import Spinner from '@/components/ui/spinner';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const dispatch = useDispatch();
  const forgotPassword = useSelector((state: any) => state?.root?.forgotPassword)

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    dispatch(forgotPasswordUser(data));
  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              onKeyDown={handleKeyDown}
              type="email"
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message as string}
            />
            { forgotPassword.loading ? (<Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              color="info"
              rounded="pill"
              disabled
            >
              Submit
              <Spinner size="sm" tag='div' className='ms-3' color='white' />
              </Button>) : (<Button
                className="w-full border-2  text-base font-bold"
                type="submit"
                color="info"
                rounded="pill"
              >
                Submit
              </Button>)
            }
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
