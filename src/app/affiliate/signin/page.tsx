
import { metaObject } from '@/config/site.config';
import SignInForm from './main-page';



export const metadata = {
    ...metaObject('Register'),
};

export default function Page() {
    return (
        <>
            <SignInForm />
        </>
    );
}
