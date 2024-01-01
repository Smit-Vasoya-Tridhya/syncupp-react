import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
  PiCurrencyCircleDollarFill,
  PiShoppingCart,
  PiHeadset,
  PiPackage,
  PiChartBar,
  PiCurrencyDollar,
  PiSquaresFour,
  PiGridFour,
  PiFeather,
  PiChartLineUp,
  PiMapPinLine,
  PiUserGear,
  PiBellSimpleRinging,
  PiUser,
  PiEnvelopeSimpleOpen,
  PiSteps,
  PiCreditCard,
  PiTable,
  PiBrowser,
  PiHourglassSimple,
  PiUserCircle,
  PiShootingStar,
  PiRocketLaunch,
  PiFolderLock,
  PiBinoculars,
  PiHammer,
  PiNoteBlank,
  PiUserPlus,
  PiShieldCheck,
  PiLockKey,
  PiChatCenteredDots,
  PiCalendarPlus,
  PiHouseLine,
  PiAirplaneTilt,
  PiPokerChip,
  PiFolderNotch,
  PiListNumbers,
  PiCaretCircleUpDown,
  PiBriefcase,
  PiLock,
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
    name: 'Authentication',
    href: routes.signIn,
    icon: <PiUserPlusDuotone />,
  },
];
