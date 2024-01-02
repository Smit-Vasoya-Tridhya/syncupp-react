import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import SignInForm from './sign-in-form';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign In 2'),
};

export default function SignIn() {
  return (
    <AuthWrapperTwo title="Sign In" isSignIn isSocialLoginActive={false}>
      <SignInForm />
    </AuthWrapperTwo>
  );
}
