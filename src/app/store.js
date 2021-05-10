import { configureStore } from '@reduxjs/toolkit';
import countItemReducer  from "../features/countItemSlice";
 
export const store = configureStore({
  reducer: {
    countItem : countItemReducer
  },
});

