import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./slices/issuesSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    issues: issuesReducer, // Ads issues to the store
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Typing for Redux-store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
