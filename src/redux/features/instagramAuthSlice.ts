import { getUser } from "./getAccountSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInstagramAuthState, NewUser } from "./models";
import { instaLogin } from "../../api/api";

const initialState: IInstagramAuthState = {
  loading: false,
  instaAuthError: "",
  success: false,
};
export type AuthError = {
  error: any;
};

// Create actions with createAsyncThunk

export const instagramLogin = createAsyncThunk<
  any,
  NewUser,
  { rejectValue: AuthError }
>("instAuth/instagramLogin", async (user, thunkAPI) => {
  try {
    const response = await instaLogin(user);
    if (response.status === 200) {
      thunkAPI.dispatch(getUser());
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
export const instaAuthSlice = createSlice({
  name: "instAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(instagramLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(instagramLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload;
    });
    builder.addCase(instagramLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.instaAuthError = payload;
    });
  },
});

export default instaAuthSlice.reducer;
