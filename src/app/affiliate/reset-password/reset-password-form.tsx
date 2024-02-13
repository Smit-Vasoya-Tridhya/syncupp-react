'use client';

import { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Form } from '@/components/ui/form';
import { resetPasswordSchema, ResetPasswordSchema } from '@/utils/validators/reset-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordUser } from '@/redux/slices/user/auth/resetPasswordSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleKeyDown } from '@/utils/common-functions';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';
import useMedia from 'react-use/lib/useMedia';
import { resetPassword } from '@/redux/slices/affiliate/authSlice';

const initialValues: ResetPasswordSchema = {
  password: '',
  confirmPassword: ''
};

export default function ResetPasswordForm({ params }: { params: { token: string, email: string } }) {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  // console.log(email, token, searchParams)

  const { loading } = useSelector((state: any) => state?.root?.auth)

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data: any) => {
    // console.log(data, 'data')
    const resetData = {
      new_password: data?.password,
      email: email,
      token: token
    }
    dispatch(resetPassword(resetData)).then((result: any) => {
      if (resetPassword.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          router.replace(routes.affiliate.signin);
        }
      }
    });
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        onSubmit={onSubmit}
        // resetValues={reset}
        useFormProps={{
          mode: 'all',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Password
              onKeyDown={handleKeyDown}
              label="New Password"
              placeholder="Enter your password"
              rounded="pill"
              color="info"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              onKeyDown={handleKeyDown}
              label="Confirm New Password"
              placeholder="Enter your password"
              rounded="pill"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              className="[&>label>span]:font-medium"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              color="info"
              rounded="pill"
              size={isMedium ? 'lg' : 'xl'}
              disabled={loading}
            >
              Reset Password
              {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
