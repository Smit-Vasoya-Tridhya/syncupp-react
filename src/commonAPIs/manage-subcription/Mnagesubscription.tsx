import AxiosDefault from '@/services/AxiosDefault';

// Agency List
type GetAlldata = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
};

export const GetAllBilling = async (data: GetAlldata) => {
  const response = await AxiosDefault({
    url: '/api/v1/',
    method: 'POST',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
export const GetAllSeats = async (data: GetAlldata) => {
  const response = await AxiosDefault({
    url: '/api/v1/',
    method: 'POST',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};

export const GetCardData = async (data: any) => {
  const response = await AxiosDefault({
    url: '/api/v1/',
    method: 'POST',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
