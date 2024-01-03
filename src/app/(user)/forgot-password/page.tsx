import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import ForgetPasswordForm from './forgot-password-form';

export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Forgot your Password">
      <ForgetPasswordForm />
    </AuthWrapperTwo>
  );
}
