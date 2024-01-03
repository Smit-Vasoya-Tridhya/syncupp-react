"use client";
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import ChangePasswordForm from './change-password-form';
import WithAuth from '@/utils/private-route-user';

function ChangePassword() {
  return (
    <AuthWrapperTwo title="Change your Password">
      <ChangePasswordForm />
    </AuthWrapperTwo>
  );
}

export default WithAuth(ChangePassword);