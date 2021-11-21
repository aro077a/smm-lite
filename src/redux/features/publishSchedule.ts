import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  publishInstagramSchedule,
  updateInstagramSchedule,
} from "../../api/api";
import { AppThunk } from "../store";
import { getSchedule } from "./postScheduleSlice";

const initialState: any = {
  loading: false,
  error: "",
};

const publishScheduleSlice = createSlice({
  name: "publish",
  initialState: { ...initialState },
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    publishScheduleFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    publishScheduleSuccess: (state, { payload }: PayloadAction<any>) => {
      state.scheduledPosts = {
        ...state.scheduledPosts,
        ...payload,
      };
    },

    updateScheduleFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    updateScheduleSuccess: (state, { payload }: PayloadAction<any>) => {
      state.scheduledPosts = {
        ...state.scheduledPosts,
        ...payload,
      };
    },
  },
});

export const publishSchedule = (id: number, schedule: any): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await publishInstagramSchedule(id, schedule);
      console.log(res);
      dispatch(setLoading(false));
      dispatch(publishScheduleSuccess(res));
    } catch (error: any) {
      publishScheduleFailure(error.massage);
      setLoading(false);
    }
  };
};

export const updateSchedule = (id: number, schedule: any): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await updateInstagramSchedule(id, schedule);
      console.log(res);
      dispatch(setLoading(false));
      dispatch(publishScheduleSuccess(res));
      dispatch(getSchedule());
    } catch (error: any) {
      publishScheduleFailure(error.massage);
      setLoading(false);
    }
  };
};

export const { setLoading, publishScheduleSuccess, publishScheduleFailure } =
  publishScheduleSlice.actions;

export default publishScheduleSlice.reducer;