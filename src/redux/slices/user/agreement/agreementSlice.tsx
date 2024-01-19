import { DeleteAgencyAgreementsApi, GetAllAgreementApi } from "@/commonAPIs/userAPIs/agreement/agencyAgreementAPIs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

//API error response type
interface APIErrorResponse {
    status: boolean;
    message: string
}


/* Agency Agreement List */

// Agency Agreement list API types
type GetAllAgreementlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

// Agency Agreement list api Call
export const getAllAgencyagreement: any = createAsyncThunk(
    "agreement/getAllAgencyagreement",
    async (data: GetAllAgreementlistApiData) => {
        try {
            const response: any = await GetAllAgreementApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);



/* Agency Agreement Delete */
type DeleteAgencyAgreement = {
    id: string[] | string;
}

export const deleteAgencyAgreement: any = createAsyncThunk(
    "adminAgency/deleteAgencyAgreement",
    async (data: DeleteAgencyAgreement) => {
        try {
            const response: any = await DeleteAgencyAgreementsApi(data);
            return response;
        } catch (error: any) {
            return { status: false, message: error.response.data.message } as APIErrorResponse;
        }
    }
);


// Slice initial States types
interface AgencyAgreementInitialState {
    loading: boolean;
    agreementDetails: any;
}

// Slice initial States
const initialState: AgencyAgreementInitialState = {
    loading: false,
    agreementDetails: {}
};


export const agencyAgreementSlice = createSlice({
    name: "agreement",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        // Agency Agreement list cases
        builder
            .addCase(getAllAgencyagreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllAgencyagreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agreementDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(getAllAgencyagreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });


        // Agency Agreement delete
        builder
            .addCase(deleteAgencyAgreement.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(deleteAgencyAgreement.fulfilled, (state, action) => {
                if (action.payload.status == false) {
                    toast.error(action.payload.message)
                }
                return {
                    ...state,
                    agreementDetails: action.payload,
                    loading: false,
                }
            })
            .addCase(deleteAgencyAgreement.rejected, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            });
    }
});

export default agencyAgreementSlice.reducer;