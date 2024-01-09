import { routes } from '@/config/routes';
import {
  PiFolderNotchDuotone,
  PiUser,
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
    name: 'Client',
    href: routes.client,
    icon: <PiUser />,
  },
  {
    name: 'Team',
    href: routes.team,
    icon: <PiUserListDuotone />,
  },
];
