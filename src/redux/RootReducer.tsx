import { combineReducers } from "@reduxjs/toolkit";
import signinSlice from "./slices/user/auth/signinSlice";
import signupSlice from "./slices/user/auth/signupSlice";
import resetPasswordSlice from "./slices/user/auth/resetPasswordSlice";
import changePasswordSlice from "./slices/user/auth/changePasswordSlice";
import forgotPasswordSlice from "./slices/user/auth/forgotPasswordSlice";
import adminSignInSlice from "./slices/admin/auth/signin/signinSlice";
import adminForgotPasswordSlice from "./slices/admin/auth/forgotpassword/forgetPasswordSlice";
import adminResetPasswordSlice from "./slices/admin/auth/resetpassword/resetPasswordSlice";
import socialSignupSlice from "./slices/user/auth/socialSignupSlice";
import viewProfileSlice from "./slices/admin/auth/viewprofile/viewProfileSlice";
import clientSlice from "./slices/user/client/clientSlice";
import teamSlice from "./slices/user/team-member/teamSlice";
import adminChangePasswordSlice from "./slices/admin/auth/updatePassword/changePasswordSlice";
import adminfaqSlice from "./slices/admin/faq/faqSlice";
import agencySlice from "./slices/admin/agency/agencySlice";
import  agencyAgreementSlice from "./slices/user/agreement/agreementSlice";
import clientAgreementSlice from "./slices/user/client/agreement/clientAgreementSlice";
import userAgencySlice from "./slices/user/agency/agencySlice";
import invoiceSlice from "./slices/user/invoice/invoiceSlice";
import taskSlice from "./slices/user/task/taskSlice";


const combinedReducer = combineReducers({
  signIn: signinSlice,
  signUp: signupSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  changePassword: changePasswordSlice,
  socialSignup: socialSignupSlice,
  adminSignIn: adminSignInSlice,
  adminForgotPassword: adminForgotPasswordSlice,
  adminResetPassword: adminResetPasswordSlice,
  viewProfile: viewProfileSlice,
  client: clientSlice,
  adminChangePassword: adminChangePasswordSlice,
  adminFaq:adminfaqSlice,
  teamMember: teamSlice,
  adminAgency: agencySlice,
  userAgency:userAgencySlice,
  invoice:invoiceSlice,
  agreement: agencyAgreementSlice,
  clienAgreement: clientAgreementSlice,
  task: taskSlice
});

 const rootReducer = (state: any, action: any) => {
  if (action.type === "signin/logoutUser") {
    state = undefined;
  } else if(action.type === "signup/lologoutUserSignUp") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer