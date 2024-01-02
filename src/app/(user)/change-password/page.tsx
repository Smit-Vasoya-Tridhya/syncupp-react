import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import ChangePasswordForm from './change-password-form';

export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Change your Password">
      <ChangePasswordForm />
    </AuthWrapperTwo>
  );
}
