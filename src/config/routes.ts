export const routes = {

  // User panel

  home: '/home',
  signIn: '/signin',
  signUp: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  viewProfile:'/view-profile',
  dashboard: '/dashboard',
  client: '/client',
  team: '/team',
  agency_team: '/agency-team',
  client_team: '/client-team',
  invoice:'/invoice',
  invoiceForm:'/invoice/create-edit',
  invoiceView:'/invoice/view-invoice',
  viewTeam:'/team/view-team',
  task: '/task',
  UserCalender: '/calender',
  UserCalenderForm: '/calender/calender-form',
  UserCalenderAddActivity: '/calender/create-edit',

  teams: {
    verify: '/team/verify'
  },
  clients: {
    verify: '/client/verify'
  },
  agreement: '/agreement',

  // Admin panel
  admin: {
    signIn: '/admin/signin',
    signUp: '/admin/signup',
    forgotPassword:'/admin/forgot-password',
    resetPassword:'/admin/reset-password',
    dashboard: '/admin/dashboard',
    viewProfile: '/admin/profile',
    faq:'/admin/faq',
    agencylist:"/admin/agencylist",
    inquiry:"/admin/inquiry",
    payment:"/admin/payment-transaction",
    cms:'/admin/cms',
    cmsTC:'/admin/cms/team-and-condition',
  },

};
