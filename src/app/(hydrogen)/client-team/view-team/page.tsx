'use client';
import WithAuthPublic from '@/utils/public-route-admin';
import ViewTeamMemberForm from './viewTeamMember';

// import { metaObject } from '@/config/site.config';

// export const metadata = {
//   ...metaObject('Sign In 2'),
// };

function SignIn() {
  return (
      <ViewTeamMemberForm/>
  );
}

export default WithAuthPublic(SignIn);
