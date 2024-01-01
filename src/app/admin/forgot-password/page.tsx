import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import ForgetPasswordForm from './forgot-password-form';

export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Reset your Password">
      <ForgetPasswordForm />
    </AuthWrapperTwo>
  );
}
