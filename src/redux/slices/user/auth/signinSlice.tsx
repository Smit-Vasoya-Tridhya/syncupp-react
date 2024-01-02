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
  loginUserStatus?: string;
  loginUserError?: string;
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
    console.log("We are in signin slice.........", data)
    try {
      const response: any = await PostSignin(data);
      console.log("signin response......", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostSigninResponse;
    }
  }
);

export const signinSlice: any = createSlice({
  name: "signin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
          return{
            ...state,
            loading: true,
          }
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log(action.payload);
        if(action.payload.success == true){
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return{
          ...state,
          user: action.payload
        }
      })
      .addCase(signInUser.rejected, (state) => {
        return{
          ...state,
          loading: false
        }
      });
  },
});

export default signinSlice.reducer;
