import AxiosDefault from "@/services/AxiosDefault";

type PostAddTaskApiData = {
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
  
type PatchEditTaskApiData = {
    clientId: string,
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

type DeleteTaskApiData = {
  client_ids: string[];
}

type GetAllTaskApiData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
}

type GetTaskByIdApiData = {
  clientId: string;
}


// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
// };

export const PostAddTaskApi = async (data: PostAddTaskApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/agency/create-client",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};


export const PatchEditTaskApi = async (data: PatchEditTaskApiData) => {
    const response = await AxiosDefault({
      url: `/api/v1/agency/update-client/${data.clientId}`,
      method: "PATCH",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };

export const GetAllTaskApi = async (data: GetAllTaskApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/agency/clients",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const GetTaskByIdApi = async (data: GetTaskByIdApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/agency/get-client/${data.clientId}`,
    method: "GET",
    // data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const DeleteTaskApi = async (data: DeleteTaskApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/agency/delete-client`,
    method: "DELETE",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};
