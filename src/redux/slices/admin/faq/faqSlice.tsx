import { GetAllFaq, PostFaqEnroll } from "@/api/auth/faq/faqApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

type AddFaqData = {
    title: string,
    description?: string,
}

interface FaqDataResponse {
  status : boolean;
  message : string
}

interface FaqInitialState {
    title: string,
    description?: string,
    data:any
}

const initialState:FaqInitialState = {
    title: '',
    description: '',
    data:[]
};

export const postAddFaq: any = createAsyncThunk(
  "faq/postAddFaq",
  async (data: AddFaqData) => {
    const apiData={
        title: data.title,
        description: data.description,
      }
    console.log("We are in FAQ slice.........", data)
    try {
      const response: any = await PostFaqEnroll(data);
      console.log("add FAQ response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as FaqDataResponse;
    }
  }
);
export const getAllFaq: any = createAsyncThunk(
  "faq/getAllFaq",
  async (data: AddFaqData) => {
    const apiData={
        title: data.title,
        description: data.description,
      }
    console.log("We are in FAQ slice.........", data)
    try {
      const response: any = await GetAllFaq(data);
      console.log("add FAQ response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as FaqDataResponse;
    }
  }
);

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    postAddFaq(state, action) {
        return {
          ...state,
          loading: false,
        };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddFaq.pending, (state) => {
          return{
            ...state,
            loading: true,
            addFaqStatus: 'pending'
          }
      })
      .addCase(postAddFaq.fulfilled, (state,action) => {
        if(action.payload.status == true){
            toast.error(action.payload.message)
        } else {
            toast.success(action.payload.message)
        }
        return{
          ...state,
          data: action.payload,
          loading: false,
          addFaqStatus: 'success'
        }
      })
      .addCase(postAddFaq.rejected, (state) => {
        return{
          ...state,
          loading: false,
          addFaqStatus: 'error'
        }
      }); 
      builder
      .addCase(getAllFaq.pending, (state) => {
          return{
            ...state,
            loading: true,
            getFaqStatus: 'pending'
          }
      })
      .addCase(getAllFaq.fulfilled, (state,action) => {
        if(action.payload.status == true){
            toast.error(action.payload.message)
        } else {
            toast.success(action.payload.message)
        }
        return{
          ...state,
          data: action.payload,
          loading: false,
          getFaqStatus: 'success'
        }
      })
      .addCase(getAllFaq.rejected, (state) => {
        return{
          ...state,
          loading: false,
          getFaqStatus: 'error'
        }
      }); 
  },
});

export default faqSlice.reducer;
