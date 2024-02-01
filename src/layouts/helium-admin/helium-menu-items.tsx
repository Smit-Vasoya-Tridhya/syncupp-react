import { routes } from '@/config/routes';
import {
  PiFolderNotchDuotone,
  PiQuestionLight,
  PiUserPlusDuotone,
} from 'react-icons/pi';
import { SiPayloadcms } from "react-icons/si";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Dashboard',
    href: routes.admin.dashboard,
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Customer',
    href: routes.admin.agencylist,
    icon: <PiUserPlusDuotone />,
  },
  {
    name: 'Inquiry',
    href: routes.admin.inquiry,
    icon: <PiUserPlusDuotone />,
  },
  {
    name: 'Payment',
    href: routes.admin.payment,
    icon: <PiUserPlusDuotone />,
  },
  {
    name: 'FAQ',
    href: routes.admin.faq,
    icon: <PiQuestionLight />,
  },
  {
    name: 'CMS',
    href: routes.admin.cms,
    icon: <SiPayloadcms />,
  },
];
