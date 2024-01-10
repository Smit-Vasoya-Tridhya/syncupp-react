'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';

export function GoogleOAuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId="397349000546-5tdugu957pad1mqpppqo78eb1bcieqrl.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
