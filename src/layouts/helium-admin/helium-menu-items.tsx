import { routes } from '@/config/routes';
import {
  PiFolderNotchDuotone,
  PiQuestionLight,
  PiUserPlusDuotone,
} from 'react-icons/pi';
import { SiPayloadcms } from 'react-icons/si';
import { FaRegStar, FaTicketAlt } from 'react-icons/fa';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Dashboard',
    href: routes.admin.dashboard,
    icon: <PiFolderNotchDuotone />,
  },
  {
    name: 'Agency',
    href: routes.admin.agencylist,
    icon: <PiUserPlusDuotone />,
  },
  {
    name: 'Client Review',
    href: routes.admin.clientReview,
    icon: <FaRegStar />,
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
  {
    name: 'Coupon Management',
    href: routes.admin.couponManagement,
    icon: <FaTicketAlt />,
  },
];
