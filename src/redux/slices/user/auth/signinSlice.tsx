import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostSignin } from "../../../../api/user/auth/authApis";
import { toast } from 'react-hot-toast';

type UserData = {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface PostSigninResponse {
  status : boolean;
  message : string
}

interface SigninState {
  loading: boolean;
  user: any;
  loginUserStatus: string;
  loginUserError: string;
}


const initialState: SigninState = {
  loading: false,
  user: {},
  loginUserStatus: '',
  loginUserError: '', 
};

export const signInUser: any = createAsyncThunk(
  "signin/signInUser",
  async (data: UserData) => {
    // console.log("We are in signin slice.........", data)
    try {
      const response: any = await PostSignin(data);
      // console.log("signin response......", response);
      // console.log("Tokenn....", response.data.token)
      
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSigninResponse;
    }
  }
);


export const signinSlice: any = createSlice({
  name: "signin",
  initialState,
  reducers: {

    logoutUser(state, action) {
      localStorage.clear();
      sessionStorage.clear();
      return {
          ...state,
          loading: false,
          user: {},
          loginUserStatus: '',
          loginUserError: '',
      };
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
          return{
            ...state,
            loading: true,
            loginUserStatus: 'pending'
          }
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        // console.log(action.payload);
        if(action.payload.status == false){
          toast.error(action.payload.message)
        } else {
          localStorage.setItem("token", action.payload.data.token);
        }
        return{
          ...state,
          // user: action.payload,
          loading: false,
          loginUserStatus: 'success'
        }
      })
      .addCase(signInUser.rejected, (state) => {
        return{
          ...state,
          loading: false,
          loginUserStatus: 'error'
        }
      });
  },
});

export const { logoutUser } = signinSlice.actions;

export default signinSlice.reducer;
