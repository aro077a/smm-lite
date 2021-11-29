import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  publishInstagramSchedule,
  updateInstagramSchedule,
} from "../../api/api";
import { AppThunk } from "../store";
import { IPublishSchedule } from "./models";
import { getSchedule } from "./postScheduleSlice";

const initialState: IPublishSchedule = {
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
    publishScheduleFailure: (state, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },

    updateScheduleFailure: (state, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },
  },
});

export const publishSchedule = (id: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await publishInstagramSchedule(id);
      dispatch(setLoading(false));
      dispatch(getSchedule());
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
      await updateInstagramSchedule(id, schedule);
      dispatch(setLoading(false));
      dispatch(getSchedule());
    } catch (error: any) {
      publishScheduleFailure(error.massage);
      setLoading(false);
    }
  };
};

export const { setLoading, publishScheduleFailure } =
  publishScheduleSlice.actions;

export default publishScheduleSlice.reducer;
