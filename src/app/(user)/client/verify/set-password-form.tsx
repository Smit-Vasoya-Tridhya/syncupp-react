'use client';

import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { handleKeyDown } from '@/utils/common-functions';
import { SetPasswordSchema, setPasswordSchema } from '@/utils/validators/set-password-schema';
import { useDispatch, useSelector } from 'react-redux';
import { postVerifyClient } from '@/redux/slices/user/client/clientSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';



export default function SetPasswordForm(props: any) {
  const isMedium = useMedia('(max-width: 1200px)', false);

  
  // console.log(formData)
  const dispatch = useDispatch();
  const router = useRouter();

  const clientSliceData = useSelector((state: any) => state?.root?.client);

  const searchParams = useSearchParams();
  console.log("search Params....", searchParams.get("email"))
  
  const email = searchParams.get("email");
  const agency = searchParams.get("agency");
  let redirectt = searchParams.get("redirect");
  console.log("redirect....", redirectt)
  let redirect = (redirectt === 'true');
  
  const initialValues = {
    firstName: '',
    lastName: '',
    email: email,
    password: '',
    confirmPassword: '',
  };
  
  const onSubmit: SubmitHandler<SetPasswordSchema> = (data) => {
    console.log('set password form data', data);
    
    const apiData = {
      email: email,
      agency_id: agency,
      password: data?.password,
      first_name: data?.firstName,
      last_name: data?.lastName,
      redirect: redirect
    }


    dispatch(postVerifyClient(apiData)).then((result: any) => {
      if (postVerifyClient.fulfilled.match(result)) {
        // console.log('resultt', result)
        if (result && result.payload.success === true ) {
          router.replace(routes.signIn);
        } 
      }
    })

  };

    return (
      <>
        <Form<SetPasswordSchema>
          validationSchema={setPasswordSchema}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
          }}
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  size={isMedium ? 'lg' : 'xl'}
                  label="First Name"
                  placeholder="Enter First Name"
                  rounded="pill"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  size={isMedium ? 'lg' : 'xl'}
                  label="Last Name"
                  placeholder="Enter Last Name"
                  rounded="pill"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('lastName')}
                  error={errors?.lastName?.message}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                <Input
                  onKeyDown={handleKeyDown}
                  type="email"
                  size={isMedium ? 'lg' : 'xl'}
                  label="Email ID"
                  placeholder="Enter your email"
                  rounded="pill"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('email')}
                  disabled
                  error={errors.email?.message}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
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
                <Password
                  onKeyDown={handleKeyDown}
                  label="Confirm Password"
                  placeholder="Enter your password"
                  size={isMedium ? 'lg' : 'xl'}
                  rounded="pill"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />
              </div>
              <div className='w-full'>
                <Button
                  className="border-2 text-base font-medium float-end"
                  type="submit"
                  size={isMedium ? 'lg' : 'xl'}
                  color="info"
                  rounded="pill"
                  disabled={clientSliceData?.loading}
                >
                  Create Password
                  { clientSliceData?.loading && <Spinner size="sm" tag='div' className='ms-3' color='white' /> }
                </Button>
              </div>
            </div>
          )}
        </Form>
        
      </>
    );
}
