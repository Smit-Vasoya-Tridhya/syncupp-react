import ForgetPasswordForm from './forgot-password-form';


import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Forgot Password'),
};


export default function ForgotPassword() {
  return (
      <ForgetPasswordForm />
  );
}
