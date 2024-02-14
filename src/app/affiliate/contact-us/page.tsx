


import { metaObject } from '@/config/site.config';
import ContactusForm from './main-page';

export const metadata = {
    ...metaObject('Contact Us'),
};


export default function ForgotPassword() {
    return (
        <ContactusForm />
    );
}
