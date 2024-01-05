import { routes } from '@/config/routes';
import {
  PiFolderNotchDuotone,
  PiUserListDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Teams',
    href: routes.team,
    icon: <PiUserListDuotone />,
  },
];
