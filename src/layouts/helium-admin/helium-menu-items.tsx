import { routes } from '@/config/routes';
import {
  PiFolderNotchDuotone,
  PiQuestionLight,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Dashboard',
    href: '/home',
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'FAQ',
    href: routes.admin.faq,
    icon: <PiQuestionLight />,
  },
];
