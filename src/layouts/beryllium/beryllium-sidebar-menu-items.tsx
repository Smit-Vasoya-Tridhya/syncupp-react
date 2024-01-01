import { routes } from '@/config/routes';
import {
  PiUserPlusDuotone,
  PiFolderNotchDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const berylliumSidebarMenuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Authentication',
    href: routes.signIn,
    icon: <PiUserPlusDuotone />,
  },
];
