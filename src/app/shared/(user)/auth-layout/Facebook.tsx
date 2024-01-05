import React, { FC } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';

interface FacebookProps {}

const Facebook: FC<FacebookProps> = () => {
  const handleResponse = (response: any) => {
    // 'response' may contain different properties, depending on the library version
    console.log(response);
  };

  return (
    <FacebookProvider appId="1123503825483323">
      <LoginButton
        scope="email"
        onSuccess={handleResponse} // Use onSuccess instead of onResponse
        onError={(error) => console.log(error)}
      >
        <span>Login with Facebook</span>
      </LoginButton>
    </FacebookProvider>
  );
};

export default Facebook;
