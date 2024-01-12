'use client';

import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { handleKeyDown } from '@/utils/common-functions';
import { SetPasswordSchema, setPasswordSchema } from '@/utils/validators/set-password-schema';



export default function SetPasswordForm(props: any) {
  const isMedium = useMedia('(max-width: 1200px)', false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // console.log(formData)


  const onSubmit: SubmitHandler<SetPasswordSchema> = (data) => {
    console.log('set password form data', data);

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
                className="border-2 border-primary-light text-base font-medium float-end"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
              >
                Create Password
              </Button>
            </div>
          </div>
        )}
      </Form>
      
    </>
  );
}
