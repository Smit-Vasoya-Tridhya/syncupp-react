import { routes } from '@/config/routes';
import {
  PiFolderNotchDuotone,
  PiUserPlusDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Authentication',
    href: routes.signIn,
    icon: <PiUserPlusDuotone />,
  },
];
