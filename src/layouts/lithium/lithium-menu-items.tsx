import { routes } from '@/config/routes';
import { PiFolderNotchDuotone, PiUserPlusDuotone } from 'react-icons/pi';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
}

export interface DropdownItemType {
  name: string;
  icon: JSX.Element;
  href?: string;
  description?: string;
  subMenuItems?: SubMenuItemType[];
}

export type menuType = 'link' | 'collapse' | 'enhance';

export interface MenuItemsType {
  id: string;
  name: string;
  type: menuType;
  popoverContentClassName?: string;
  dropdownItems?: DropdownItemType[];
}

export const menuItems: DropdownItemType[] = [
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
