import { configureStore } from '@reduxjs/toolkit';
import countItemReducer  from "../features/countItemSlice";
import userReducer from "../features/userSlice";
 
export const store = configureStore({
  reducer: {
    countItem : countItemReducer,
    user: userReducer
  },
});

