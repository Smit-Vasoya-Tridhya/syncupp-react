import { routes } from '@/config/routes';
import {
  PiFolderNotchDuotone,
  PiUserPlusDuotone,
} from 'react-icons/pi';

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
    href: '/admin/faq',
    icon: <PiUserPlusDuotone />,
  },
];
