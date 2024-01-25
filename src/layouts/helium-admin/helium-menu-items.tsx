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
    href: '/home',
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Customer',
    href: '/admin/agencylist',
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
