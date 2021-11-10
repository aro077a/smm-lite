import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUSer } from "./models";
import { getUserAccount } from "../../api/api";

const initialState: IUSer = {
  account: [],
  loading: false,
};
export type AuthError = {
  error: any;
};

// Create actions with createAsyncThunk

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await getUserAccount();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
  }
});

// Then, handle actions in reducers:
export const getAccountSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.account = payload;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export default getAccountSlice.reducer;
