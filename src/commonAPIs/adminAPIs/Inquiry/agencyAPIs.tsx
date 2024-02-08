import AxiosDefault from "@/services/AxiosDefault";


// Inquiry List
type GetAllinquiryApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

export const GetAllinquiryApi = async (data: GetAllinquiryApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/admin/agencies",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



//Delete Inquiry list

type DeleteAgency = {
    inquiries: string[];
    status?: string | boolean
    delete?: boolean
}

export const DeleteAgencysApi = async (data: DeleteAgency) => {
    const response = await AxiosDefault({
        url: `/api/v1/admin/update-agency`,
        method: "PATCH",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};