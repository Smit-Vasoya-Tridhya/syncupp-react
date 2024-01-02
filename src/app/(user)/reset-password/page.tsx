
'use client';
import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import ResetPasswordForm from './reset-password-form';


export default function SignIn() {
  return (
    <AuthWrapperTwo title="Reset Password" isSignIn isSocialLoginActive={false}>
      <ResetPasswordForm />
    </AuthWrapperTwo>
  );
}
