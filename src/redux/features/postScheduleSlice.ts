import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISchedule, TUserIdType, TScheduleError } from "./models";
import {
  deleteInstagramSchedule,
  getInstagramSchedule,
  postInstagramSchedule,
} from "../../api/api";
import { togglePopup } from "./popupSlice";

const initialState: ISchedule = {
  scheduledPosts: [],
  loading: false,
  errors: [],
};

export const postSchedule = createAsyncThunk<
  any,
  any,
  { rejectValue: TScheduleError[] }
>("schedule/postSchedule", async (schedule, thunkAPI) => {
  try {
    const response = await postInstagramSchedule(schedule);

    if (response.status === 200) {
      thunkAPI.dispatch(getSchedule());
      thunkAPI.dispatch(togglePopup({ modalIsOpen: false, name: "post" }));

      return response.data.result;
    }
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getSchedule = createAsyncThunk(
  "schedule/getSchedule",
  async () => {
    try {
      const response = await getInstagramSchedule();
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
    }
  }
);

export const deleteSchedule = createAsyncThunk<
  any,
  TUserIdType,
  { rejectValue: TScheduleError[] }
>("schedule/deleteSchedule", async (userId, thunkAPI) => {
  try {
    const response = await deleteInstagramSchedule(userId);
    if (response.status === 200) {
      thunkAPI.dispatch(getSchedule());
      thunkAPI.dispatch(togglePopup({ modalIsOpen: false, name: "delete" }));
      return response.data.result;
    }
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Then, handle actions in reducers:
export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postSchedule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postSchedule.fulfilled, (state) => {
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(postSchedule.rejected, (state, { payload }) => {
      state.loading = false;
      state.errors = payload;
    });

    builder.addCase(getSchedule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSchedule.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.scheduledPosts = payload;
    });
    builder.addCase(getSchedule.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteSchedule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSchedule.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteSchedule.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default scheduleSlice.reducer;
