import {
    PostFaqEnroll,
  } from '@/api/auth/faq/faqApis';
  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
  import { toast } from 'react-hot-toast';
  
  type AddTermAndConditionData = {
    _id?:string,
    title: string,
    description?: string,
  };
  
  interface FaqDataResponse {
    status: boolean;
    message: string;
  }
  interface TermAndConditionInitialState {
    loading: boolean;
    _id: string;
    title: string;
    description?: string;
    data: any;
  }
  const initialState: TermAndConditionInitialState = {
    loading: false,
    _id: '',
    title: '',
    description: '',
    data: [],
  };
  
  export const postAddTermAndCondition: any = createAsyncThunk(
    'cms/postAddTermAndCondition',
    async (data: AddTermAndConditionData) => {
      console.log('We are in FAQ slice.........', data);
      try {
        const response: any = await PostFaqEnroll(data);
        console.log('add FAQ response....', response);
        return response;
      } catch (error: any) {
        return {
          status: false,
          message: error.response.data.message,
        } as FaqDataResponse;
      }
    }
  );
//   export const updateFaqDataByID: any = createAsyncThunk(
//     'faq/updateFaqDataByID',
//     async (data: AddTermAndConditionData) => {
//       const apiData = {
//         _id: data._id,
//         title: data.title,
//         description: data.description,
//       };
//       console.log('We are in FAQ slice.........', data);
//       try {
//         const response: any = await UpdateFaqDataByID(data);
//         console.log('add FAQ response....', response);
//         return response;
//       } catch (error: any) {
//         return {
//           status: false,
//           message: error.response.data.message,
//         } as FaqDataResponse;
//       }
//     }
//   );
  
  export const cmsSlice = createSlice({
    name: 'cms',
    initialState,
    reducers: {
      RemoveFaqData(state) {
        return {
          ...state,
          faqData: ''
        };
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(postAddTermAndCondition.pending, (state) => {
          return {
            ...state,
            loading: true,
            addFaqStatus: 'pending',
          };
        })
        .addCase(postAddTermAndCondition.fulfilled, (state, action) => {
          if (action.payload.status == true) {
            toast.error(action.payload.message);
          } else {
            toast.success(action.payload.message);
          }
          return {
            ...state,
            // data: action.payload,
            loading: false,
            addFaqStatus: 'success',
          };
        })
        .addCase(postAddTermAndCondition.rejected, (state) => {
          return {
            ...state,
            loading: false,
            addFaqStatus: 'error',
          };
        });
    
    },
  });
  
  export const { RemoveFaqData } = cmsSlice.actions;
  export default cmsSlice.reducer;
  