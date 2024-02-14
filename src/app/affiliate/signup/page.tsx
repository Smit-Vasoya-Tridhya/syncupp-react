
import { metaObject } from '@/config/site.config';
import RegisterPage from './main-page';



export const metadata = {
    ...metaObject('Register'),
};

export default function Page() {
    return (
        <>
            <RegisterPage />
        </>
    );
}
