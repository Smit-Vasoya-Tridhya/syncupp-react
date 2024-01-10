"use client";
import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import WithAuth from '@/utils/private-route-admin';
import ViewProfileForm from './view-profile';

function ChangePassword() {
  return (
    <AuthWrapperTwo title="Change your Password">
      <ViewProfileForm />
    </AuthWrapperTwo>
  );
}

export default WithAuth(ChangePassword);