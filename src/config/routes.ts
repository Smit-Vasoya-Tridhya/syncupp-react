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
  clientViewProfile: '/client/view-profile',
  team: '/team',
  agency_team: '/agency-team',
  agency_team_payment: '/agency-team/payment',
  client_team: '/client-team',
  referal: '/referal',
  invoice: '/invoice',
  invoiceForm: '/invoice/create',
  invoiceEdit: '/invoice/edit',
  invoiceView: '/invoice/view-invoice',
  viewTeam: '/team/view-team',
  task: '/tasks',
  manageSubcription: '/manage-subscripation',
  userCalendar: '/calendar',
  userCalendarForm: '/calendar/calendar-form',
  userCalendarAddActivity: '/calendar/create-edit',

  teams: {
    verify: '/team/verify',
  },
  clients: {
    verify: '/client/verify',
    payment: '/client/payment',
    agreement: '/client/agreement',
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
    agencylist: "/admin/agencylist",
    inquiry: "/admin/inquiry",
    payment: "/admin/payment-transaction",
    cms: '/admin/cms',
    cmsTC: '/admin/cms/team-and-condition',
    agencyView: '/admin/view-agency',
    clientReview: '/admin/client-review',
    cmsContact: '/admin/cms/contact-us/edit',
    cmsAbout: '/admin/cms/about-us/edit',
    cmsPricing: '/admin/cms/pricing/edit',
    cmsPrivacy: '/admin/cms/privacy/edit',
    cmsPriceCampare: '/admin/cms/pricing-campare/edit',

    cmsAboutView: '/admin/cms/about-us/view-aboutus',
    cmsContactView: '/admin/cms/contact-us/view-contactus',
    cmsPricingView: '/admin/cms/pricing/view-pricing',
    cmsPrivacyView: '/admin/cms/privacy/view-Privacy',
    cmsPriceCampareView: '/admin/cms/pricing-campare/view-pricaingcampare',

    couponManagement: '/admin/coupon-management',
    createCouponManagement: `/admin/coupon-management/create`,
    UpdateCouponManagement: `/admin/coupon-management/update`,
  },

  // Affiliate routes

  affiliate: {
    signup: `/affiliate/signup`,
    signin: `/affiliate/signin`,
    forgotPassword: `/affiliate/forgot-password`,
    resetPassword: `/affiliate/reset-password`,
  },
};
