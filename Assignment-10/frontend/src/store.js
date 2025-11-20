import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import jobsReducer from "./store/jobsSlice";
import usersReducer from "./store/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    users: usersReducer,
  },
});

export default store;