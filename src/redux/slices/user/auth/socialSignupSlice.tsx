import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostSignup, PostSocialSignupFacebook, PostSocialSignupGoogle } from "../../../../api/user/auth/authApis";
import { toast } from 'react-hot-toast';

type GoogleUserData = {
  signupId: string;
}

type FacebookUserData = {
  access_token: string;
}

interface PostSignUpResponse {
  status : boolean;
  message : string
}

interface SignUpState {
  loading: boolean;
  user: any;
  googleSignUpUserStatus: string;
  googleSignUpUserError: string;
  facebookSignUpUserStatus: string;
  facebookSignUpUserError: string;
}


const initialState:SignUpState = {
  loading: false,
  user: {},
  googleSignUpUserStatus: '',
  googleSignUpUserError: '', 
  facebookSignUpUserStatus: '',
  facebookSignUpUserError: '', 
};

export const googleSignUpUser: any = createAsyncThunk(
  "socialSignup/googleSignUpUser",
  async (data: GoogleUserData) => {
    // console.log("We are in socialSignup slice Google.........", data)
    try {
      const response: any = await PostSocialSignupGoogle(data);
      // console.log("socialSignup response Google.....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSignUpResponse;
    }
  }
);

export const facebookSignUpUser: any = createAsyncThunk(
  "socialSignup/facebookSignUpUser",
  async (data: FacebookUserData) => {
    // console.log("We are in socialSignup slice Facebook.........", data);
    try {
      const response: any = await PostSocialSignupFacebook(data);
      // console.log("socialSignup response Facebook.....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSignUpResponse;
    }
  }
);

export const socialSignupSlice = createSlice({
  name: "socialSignup",
  initialState,
  reducers: {

    logoutUserSignUp(state, action) {
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        loading: false,
        user: {},
        googleSignUpUserStatus: '',
        googleSignUpUserError: '', 
      };
  },

  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignUpUser.pending, (state) => {
          return{
            ...state,
            loading: true,
            googleSignUpUserStatus: 'pending'
          }
      })
      .addCase(googleSignUpUser.fulfilled, (state,action) => {
        // console.log(action.payload);
        if(action.payload.status == false){
          toast.error(action.payload.message)
        } else {
          localStorage.setItem("token", action.payload.data.token);
        }
        return{
          ...state,
          user: action.payload,
          loading: false,
          googleSignUpUserStatus: 'success'
        }
      })
      .addCase(googleSignUpUser.rejected, (state) => {
        return{
          ...state,
          loading: false,
          googleSignUpUserStatus: 'error'
        }
      }); // new cases for facebook
      builder
      .addCase(facebookSignUpUser.pending, (state) => {
          return{
            ...state,
            loading: true,
            facebookSignUpUserStatus: 'pending'
          }
      })
      .addCase(facebookSignUpUser.fulfilled, (state,action) => {
        // console.log(action.payload);
        if(action.payload.status == false){
          toast.error(action.payload.message)
        } else {
          localStorage.setItem("token", action.payload.data.token);
        }
        return{
          ...state,
          user: action.payload,
          loading: false,
          facebookSignUpUserStatus: 'success'
        }
      })
      .addCase(facebookSignUpUser.rejected, (state) => {
        return {
          ...state,
          loading: false,
          facebookSignUpUserStatus: 'error'
        }
      });
  },
});

export const { logoutUserSignUp } = socialSignupSlice.actions;
export default socialSignupSlice.reducer;
