import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from './slices/admin/auth/signin/signinSlice';

const combinedReducer = combineReducers({
  auth: authSliceReducer,
});

export const rootReducer = (state:any, action: AnyAction) => {
  // if (action.type === "auth/Logout") {
  //   state = undefined;
  // }
  return combinedReducer(state, action);
};
