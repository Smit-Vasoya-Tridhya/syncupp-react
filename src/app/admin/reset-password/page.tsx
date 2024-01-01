import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import ResetPasswordForm from './reset-password-form';

export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Reset your Password">
      <ResetPasswordForm />
    </AuthWrapperTwo>
  );
}
