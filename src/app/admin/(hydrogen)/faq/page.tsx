"use client";
import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import WithAuth from '@/utils/private-route-admin';
import FaqManagementForm from './faq-form';
import FaqPage from './main-page';

function ChangePassword() {
  return (
      <FaqPage />
  );
}

export default WithAuth(ChangePassword);