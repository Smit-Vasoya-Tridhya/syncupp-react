import {
  EditCmsConatctUs,
  GetCmsConatctUS,
  PostTermAndCondotionEnroll,
} from '@/api/admin/cms/cmsApis';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

type AddTermAndConditionData = {
  _id?: string;
  title: string;
  description?: string;
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
  addTermAndConditionStatus: any;
  conatcUSdata: any;
}
const initialState: TermAndConditionInitialState = {
  loading: false,
  _id: '',
  title: '',
  description: '',
  data: [],
  addTermAndConditionStatus: '',
  conatcUSdata: '',
};

export const postAddTermAndCondition: any = createAsyncThunk(
  'cms/postAddTermAndCondition',
  async (data: AddTermAndConditionData) => {
    try {
      const response: any = await PostTermAndCondotionEnroll(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const EditContactUS: any = createAsyncThunk(
  'cms/editconatcus',
  async (data: any) => {
    try {
      const response: any = await EditCmsConatctUs(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const GetConatcus: any = createAsyncThunk(
  'cms/getconatcus',
  async (data: any) => {
    try {
      const response: any = await GetCmsConatctUS();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const cleardata = createAction('cms/clearState');
export const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    RemoveFaqData(state) {
      return {
        ...state,
        faqData: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cleardata, (state) => {
      return {
        ...state,
        conatcUSdata: '',
      };
    });
    builder
      .addCase(postAddTermAndCondition.pending, (state) => {
        return {
          ...state,
          loading: true,
          addTermAndConditionStatus: 'pending',
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
          addTermAndConditionStatus: 'success',
        };
      })
      .addCase(postAddTermAndCondition.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });
    //get conatctus
    builder
      .addCase(GetConatcus.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(GetConatcus.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(GetConatcus.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    // update contact us
    builder
      .addCase(EditContactUS.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(EditContactUS.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
        };
      })
      .addCase(EditContactUS.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });
  },
});

export const { RemoveFaqData } = cmsSlice.actions;
export default cmsSlice.reducer;
