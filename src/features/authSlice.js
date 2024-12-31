import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signin } from "../common/apiService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await signin(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAdmin: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAdmin = action.payload.roles?.includes("ADMIN") || false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
