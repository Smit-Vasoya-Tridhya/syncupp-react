
import { metaObject } from '@/config/site.config';
import PaymentPage from './main-page';


export const metadata = {
    ...metaObject('Payment'),
};

export default function Page() {
    return (
        <>
            <PaymentPage />
        </>
    );
}
