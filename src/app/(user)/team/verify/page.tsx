import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import { metaObject } from '@/config/site.config';
import SetPasswordForm from './set-password-form';

export const metadata = {
  ...metaObject('SetPassword'),
};

export default function Page() {
  return (
    <AuthWrapperTwo title="Set your password" isSocialLoginActive={false}>
      <SetPasswordForm />
    </AuthWrapperTwo>
  );
}