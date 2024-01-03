import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostSignup } from "../../../../api/user/auth/authApis";
import { toast } from 'react-hot-toast';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword?: string;
  companyName?: string;
  companyWebsite?: string;
  peopleCount?: string;
  industry?: string;
}

interface PostSignUpResponse {
  status : boolean;
  message : string
}

interface SignUpState {
  loading: boolean;
  user: any;
  signUpUserStatus: string;
  signUpUserError: string;
}


const initialState:SignUpState = {
  loading: false,
  user: {},
  signUpUserStatus: '',
  signUpUserError: '', 
};

export const signUpUser: any = createAsyncThunk(
  "signup/signUpUser",
  async (data: UserData) => {
    // console.log("We are in signup slice.........", data)
    const apiData={
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      contact_number: data.contact,
      password: data.password,
      company_name: data.companyName,
      company_website: data.companyWebsite,
      no_of_people: data.peopleCount,
      industry: data.industry,
    }
    try {
      const response: any = await PostSignup(apiData);
      // console.log("Signup response.....", response);
      // console.log("Tokenn....", response.data.token)
      localStorage.setItem("token", response.data.token);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSignUpResponse;
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {

    logoutUserSignUp(state, action) {
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        loading: false,
        user: {},
        signUpUserStatus: '',
        signUpUserError: '', 
      };
  },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
          return{
            ...state,
            loading: true,
            signUpUserStatus: 'pending'
          }
      })
      .addCase(signUpUser.fulfilled, (state,action) => {
        // console.log(action.payload);
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          // user: action.payload,
          loading: false,
          signUpUserStatus: 'success'
        }
      })
      .addCase(signUpUser.rejected, (state) => {
        return{
          ...state,
          loading: false,
          signUpUserStatus: 'error'
        }
      });
  },
});

export const { logoutUserSignUp } = signupSlice.actions;
export default signupSlice.reducer;
