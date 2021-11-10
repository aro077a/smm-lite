import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authSlice from "./features/authSlice";
import getAccountSlice from "./features/getAccountSlice";
import instagramAuthSlice from "./features/instagramAuthSlice";

export const store = configureStore({
  reducer: {
    user: getAccountSlice,
    auth: authSlice,
    instagramAuth: instagramAuthSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
