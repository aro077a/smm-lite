import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthState, NewUser } from "./models";
import { logoutUser, signIn, signUp } from "../../api/api";
import history from "../../utils/history";

const initialState: IAuthState = {
  loading: false,
  signInError: "",
  signUpError: "",
};
export type AuthError = {
  error: any;
};

// Create actions with createAsyncThunk
export const register = createAsyncThunk<
  any,
  NewUser,
  { rejectValue: AuthError }
>("auth/register", async (newUser, thunkAPI) => {
  try {
    const response = await signUp(newUser);
    if (response.status === 200) {
      history.push("/signin");
    }
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const response = await signIn(user);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        history.push("/");
        return response.data.token;
      }
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  // <
  //   any,
  //   TokenType,
  //   { rejectValue: AuthError }
  // >
  "auth/logout",
  async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      history.push("/signin");
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
    }
  }
);

// Then, handle actions in reducers:
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
      state.signUpError = payload;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.signInError = payload;
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
