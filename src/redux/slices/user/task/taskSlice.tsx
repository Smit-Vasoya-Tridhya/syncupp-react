import { DeleteTaskApi, GetAllTaskApi, GetTaskByIdApi, PatchEditTaskApi, PostAddTaskApi, putTaskStatusChangeApi } from "@/api/user/task/taskApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

type AddTaskData = {
  title: string;
  description?: string;
  due_date?: string;
  client?: string;
  assigned?: string;
  done?: boolean;
}

type EditTaskData = {
  _id: string;
  title?: string;
  description?: string;
  due_date?: string;
  client?: string;
  assigned?: string;
  done?: boolean;
}

type GetAllTaskData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
}

type GetTaskByIdData = {
  taskId: string;
}

type DeleteTaskData = {
  taskIdsToDelete: string[];
}

type putTaskStatusChangeData = {
  status: string;
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
  editTaskStatusChange: string;
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
  editTaskStatusChange: '',
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
        client_id: data?.client,
        assign_to: data?.assigned,
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

export const putTaskStatusChange: any = createAsyncThunk(
  "task/putTaskStatusChange",
  async (data: putTaskStatusChangeData) => {
    console.log("We are in task slice.........", data)
    try {
      const response: any = await putTaskStatusChangeApi(data);
      console.log("delete task response....", response);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const taskSlice: any = createSlice({
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
        if (action.payload.status === false) {
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
    // new cases for update task status
    builder
      .addCase(putTaskStatusChange.pending, (state) => {
        return {
          ...state,
          loading: true,
          editTaskStatusChange: 'pending'
        }
      })
      .addCase(putTaskStatusChange.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            editTaskStatusChange: 'error'
          }
        } else {
          toast.success(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            editTaskStatusChange: 'success'
          }
        }
      })
      .addCase(putTaskStatusChange.rejected, (state) => {
        return {
          ...state,
          loading: false,
          editTaskStatusChange: 'error'
        }
      });
  },
});

export const { RemoveTaskData, setGridView } = taskSlice.actions;
export default taskSlice.reducer;
