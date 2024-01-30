import { DeleteTaskApi, GetAllTaskApi, GetTaskByIdApi, PatchEditTaskApi, PostAddTaskApi } from "@/api/user/task/taskApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

type AddTaskData = {
  title: string;
  description?: string;
  due_date?: string;
  due_time?: string;
  client?: string;
  assigned?: string;
  done?: boolean;
}

type EditTaskData = {
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

type GetAllTaskData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
}

type GetTaskByIdData = {
  clientId: string;
}

type DeleteTaskData = {
  client_ids: string[];
}

interface PostAPIResponse {
  status: boolean;
  message: string
}

interface TaskInitialState {
  loading: boolean;
  data: any;
  task: any;
  gridView: boolean;
  addTaskStatus: string;
  getAllTaskStatus: string;
  getTaskStatus: string;
  editTaskStatus: string;
  deleteTaskStatus: string;
}

const initialState: TaskInitialState = {
  loading: false,
  data: '',
  task: '',
  gridView: false,
  addTaskStatus: '',
  getAllTaskStatus: '',
  getTaskStatus: '',
  editTaskStatus: '',
  deleteTaskStatus: '',
};

export const postAddTask: any = createAsyncThunk(
  "task/postAddTask",
  async (data: AddTaskData) => {
    console.log("We are in task slice.........", data)
    try {
      const apiData = {
        title: data?.title,
        internal_info: data?.description,
        due_date: data?.due_date,
        due_time: data?.due_time,
        client_id: '659aa86bd4c6c56ca7ccac14',
        assign_to: '659ed6ca5c7429be94d1d935',
        mark_as_done: data?.done
      }
      const response: any = await PostAddTaskApi(apiData);
      console.log("add task response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const patchEditTask: any = createAsyncThunk(
  "task/patchEditTask",
  async (data: EditTaskData) => {
    console.log("We are in task slice.........", data)
    try {
      const response: any = await PatchEditTaskApi(data);
      console.log("edit task response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getAllTask: any = createAsyncThunk(
  "task/getAllTask",
  async (data: GetAllTaskData) => {
    console.log("We are in task slice.........", data)
    try {
      const response: any = await GetAllTaskApi(data);
      console.log("get all task response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getTaskById: any = createAsyncThunk(
  "task/getTaskById",
  async (data: GetTaskByIdData) => {
    console.log("We are in task slice.........", data)
    try {
      const response: any = await GetTaskByIdApi(data);
      console.log("get task by id response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const deleteTask: any = createAsyncThunk(
  "task/deleteTask",
  async (data: DeleteTaskData) => {
    console.log("We are in task slice.........", data)
    try {
      const response: any = await DeleteTaskApi(data);
      console.log("delete task response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    RemoveTaskData(state) {
      return {
        ...state,
        task: ''
      }
    },
    setGridView(state, action) {
      return {
        ...state,
        gridView: action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddTask.pending, (state) => {
        return {
          ...state,
          loading: true,
          addTaskStatus: 'pending'
        }
      })
      .addCase(postAddTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          addTaskStatus: 'success'
        }
      })
      .addCase(postAddTask.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTaskStatus: 'error'
        }
      });
    // new cases for Edit task
    builder
      .addCase(patchEditTask.pending, (state) => {
        return {
          ...state,
          loading: true,
          editTaskStatus: 'pending'
        }
      })
      .addCase(patchEditTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          editTaskStatus: 'success'
        }
      })
      .addCase(patchEditTask.rejected, (state) => {
        return {
          ...state,
          loading: false,
          editTaskStatus: 'error'
        }
      });

    // new cases for get all task
    builder
      .addCase(getAllTask.pending, (state) => {
        return {
          ...state,
          loading: true,
          getAllTaskStatus: 'pending'
        }
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        }
        return {
          ...state,
          data: action?.payload?.data,
          loading: false,
          getAllTaskStatus: 'success'
        }
      })
      .addCase(getAllTask.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getAllTaskStatus: 'error'
        }
      });
    // new cases for get task by Id
    builder
      .addCase(getTaskById.pending, (state) => {
        return {
          ...state,
          loading: true,
          getTaskStatus: 'pending'
        }
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        // console.log(action.payload);
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          task: action?.payload?.data,
          loading: false,
          getTaskStatus: 'success'
        }
      })
      .addCase(getTaskById.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getTaskStatus: 'error'
        }
      });
    // new cases for delete task
    builder
      .addCase(deleteTask.pending, (state) => {
        return {
          ...state,
          loading: true,
          deleteTaskStatus: 'pending'
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteTaskStatus: 'error'
          }
        } else {
          toast.success(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteTaskStatus: 'success'
          }
        }
      })
      .addCase(deleteTask.rejected, (state) => {
        return {
          ...state,
          loading: false,
          deleteTaskStatus: 'error'
        }
      });
  },
});

export const { RemoveTaskData, setGridView } = taskSlice.actions;
export default taskSlice.reducer;
