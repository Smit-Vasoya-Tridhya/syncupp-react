
import { metaObject } from '@/config/site.config';
import FaqPage from './main-page';

export const metadata = {
    ...metaObject('FAQ'),
};


export default function Faq() {
    return (
        <FaqPage />
    );
}
