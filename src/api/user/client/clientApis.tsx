import AxiosDefault from "@/services/AxiosDefault";

type PostAddClientApiData = {
    name: string;
    email: string;
    company_name: string;
    company_website?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    title?: string;
    contact_number?: string;
}

type PatchEditClientApiData = {
    name: string;
    email: string;
    company_name: string;
    company_website?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    title?: string;
    contact_number?: string;
}

type DeleteClientApiData = {
  clientId: string;
}

type GetAllClientApiData = {
  page: number;
  items_per_page: number;
  sort_order: string;
  sort_field: string;
  search: string;
}

type PostVerifyClientApiData = {
    email: string;
    agency_id: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    redirect: boolean;
}

type MasterApiData = {
  search?: string;
  stateId?: string;
  countryId?: string;
}

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
// };

export const PostAddClientApi = async (data: PostAddClientApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/agency/create-client",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};


export const PatchEditClientApi = async (data: PatchEditClientApiData) => {
    const response = await AxiosDefault({
      url: "/api/v1/agency/create-client",
      method: "POST",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };

export const GetAllClientApi = async (data: GetAllClientApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/agency/clients",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const DeleteClientApi = async (clientId: DeleteClientApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/agency/delete-client/${clientId}`,
    method: "DELETE",
    // data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const GetAllCountryApi = async (data: MasterApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/auth/countries`,
    method: "POST",
    // data: data.search,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const GetAllStateApi = async (data: MasterApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/auth/states/${data.countryId}`,
    method: "POST",
    // data: data.search,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const GetAllCityApi = async (data: MasterApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/auth/cities/${data.stateId}`,
    method: "POST",
    // data: data.search,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};