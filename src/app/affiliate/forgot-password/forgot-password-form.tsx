'use client';

import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { forgetPasswordSchema, ForgetPasswordSchema } from '@/utils/validators/forget-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { handleKeyDown } from '@/utils/common-functions';
import Spinner from '@/components/ui/spinner';
import useMedia from 'react-use/lib/useMedia';
import { forgotPassword } from '@/redux/slices/affiliate/authSlice';
import { useRouter } from 'next/navigation';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const router = useRouter()
  const { loading } = useSelector((state: any) => state?.root?.auth)

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    console.log(data, 'data')
    dispatch(forgotPassword(data)).then((result: any) => {
      if (forgotPassword.fulfilled.match(result)) {
        // console.log(result, 'result', result?.payload?.data?.user?.status, result?.payload?.data?.user?.role?.name)
        if (result && result.payload.success === true) {
          router.replace(routes.affiliate.signin);
        }
      }
    })

  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'all',
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
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message as string}
            />
            <Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              color="info"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
              disabled={loading}
            >
              Submit
              {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.affiliate.signin}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
