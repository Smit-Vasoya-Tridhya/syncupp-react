import {createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';


interface PostAPIResponse {
    status : boolean;
    message : string
  }

interface ClientInitialState {
    loading: boolean;
    data: any;
    client: any;
    countries: any;
    states: any;
    cities: any;
    addClientStatus: string;
    verifyClientStatus: string;
    getAllClientStatus: string;
    getClientStatus: string;
    editClientStatus: string;
    deleteClientStatus: string;
    getClientProfileStatus: string;
    updateClientStatus:string;
  }
  
const initialState:ClientInitialState = {
    loading: false,
    data: '',
    client: '',
    countries: '',
    states: '',
    cities: '',
    addClientStatus: '',
    verifyClientStatus: '',
    getAllClientStatus: '',
    getClientStatus: '',
    editClientStatus: '',
    deleteClientStatus: '',
    getClientProfileStatus: '',
    updateClientStatus:'',
  };

//   export const postAddClient: any = createAsyncThunk(
//     "invoice/postAddClient",
//     async () => {
//     //   console.log("We are in client slice.........", data)
//       try {
//         const response: any = await PostAddTeamMemberApi();
//         console.log("add client response....", response);
//         return response;
//       } catch (error: any) {
//         return { status: false, message: error.response.data.message } as PostAPIResponse;
//       }
//     }
//   );

  export const invoiceSlice = createSlice({
    name: "invoice",
  initialState,
  reducers: {
    RemoveRegionalData(state) {
      return {
        ...state,
      }
    },
    RemoveClientData(state) {
      return {
        ...state,
      }
    }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(postAddClient.pending, (state) => {
    //       return{
    //         ...state,
    //         loading: true,
    //         addClientStatus: 'pending'
    //       }
    //   })
    //   .addCase(postAddClient.fulfilled, (state,action) => {
    //     // console.log(action.payload);
    //     if(action.payload.status == false){
    //         toast.error(action.payload.message)
    //     } else {
    //         toast.success(action.payload.message)
    //     }
    //     return{
    //       ...state,
    //     //   data: action.payload,
    //       loading: false,
    //       addClientStatus: 'success'
    //     }
    //   })
    //   .addCase(postAddClient.rejected, (state) => {
    //     return{
    //       ...state,
    //       loading: false,
    //       addClientStatus: 'error'
    //     }
    //   });
    },
   });
   export default invoiceSlice.reducer;
