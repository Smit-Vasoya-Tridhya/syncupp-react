export const routes = {
  // User panel

  home: '/home',
  signIn: '/signin',
  signUp: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  viewProfile: '/view-profile',
  dashboard: '/dashboard',
  client: '/client',
  team: '/team',
  agency_team: '/agency-team',
  agency_team_payment: '/agency-team/payment',
  client_team: '/client-team',
  invoice: '/invoice',
  invoiceForm: '/invoice/create',
  invoiceEdit: '/invoice/edit',
  invoiceView: '/invoice/view-invoice',
  viewTeam: '/team/view-team',
  task: '/task',
  userCalendar: '/calendar',
  userCalendarForm: '/calendar/calendar-form',
  userCalendarAddActivity: '/calendar/create-edit',

  teams: {
    verify: '/team/verify',
  },
  clients: {
    verify: '/client/verify',
    payment: '/client/payment',
    agreement: '/client/agreement'
  },
  agreement: '/agreement',

  // Admin panel
  admin: {
    signIn: '/admin/signin',
    signUp: '/admin/signup',
    forgotPassword: '/admin/forgot-password',
    resetPassword: '/admin/reset-password',
    dashboard: '/admin/dashboard',
    viewProfile: '/admin/profile',
    faq: '/admin/faq',
    agencylist: '/admin/agencylist',
    clientReview: '/admin/client-review',
    inquiry: '/admin/inquiry',
    payment: '/admin/payment-transaction',
    cms: '/admin/cms',
    cmsTC: '/admin/cms/team-and-condition',
    couponManagement: '/admin/coupon-management',
    createCouponManagement: `/admin/coupon-management/create`,
    UpdateCouponManagement: `/admin/coupon-management/update`,
  },


  // Affiliate routes

  affiliate:{
    signup:`/affiliate/signup`,
    signin: `/affiliate/signin`,
    forgotPassword:`/affiliate/forgot-password`,
    resetPassword:`/affiliate/reset-password`
  }
};
