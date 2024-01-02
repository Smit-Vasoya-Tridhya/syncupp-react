export const routes = {

  // User panel

  home: '/home',
  signIn: '/signin',
  signUp: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: (token: string) => `/reset-password/${token}`,
  changePassword: '/change-password',
  dashboard: '/dashboard',



  // Admin panel

  file: {
    dashboard: '/file',
  },
  admin:{
    signIn: '/admin/signin',
    signUp: '/admin/signup',
    forgotPassword:'/admin/forgot-password',
    resetPassword:'/admin/reset-password'
  },
  
};
