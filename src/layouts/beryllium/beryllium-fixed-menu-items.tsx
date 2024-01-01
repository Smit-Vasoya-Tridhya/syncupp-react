import { routes } from '@/config/routes';
import { IconType } from 'react-icons/lib';
import {
  PiFolderNotchDuotone,
  PiUserPlusDuotone,
} from 'react-icons/pi';
import { atom } from 'jotai';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}

export const berylliumMenuItems: ItemType[] = [
  {
    name: 'signIn',
    icon: <PiFolderNotchDuotone />,
    href: '/',
  },
  {
    name: 'Authentication',
    icon: <PiUserPlusDuotone />,
    href: routes.signIn,
  },
];
export const berylliumMenuItemAtom = atom(berylliumMenuItems[0]);
