import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

export const signIn = createAsyncThunk(
  "auth/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/signin", credentials);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // signInStart: (state) => {
    //   state.isLoading = true;
    // },
    // signInSuccess: (state, action) => {
    //   (state.currentUser = action.payload),
    //     (state.error = null),
    //     (state.isLoading = false);
    // },
    // signInFailure: (state, action) => {
    //   (state.error = action.payload), (state.isLoading = false);
    // },
    // signOutStart: (state) => {
    //   state.isLoading = true;
    // },
    // signOutSuccess: (state) => {
    //   (state.currentUser = null),
    //     (state.error = null),
    //     (state.isLoading = false);
    // },
    // signOutFailure: (state, action) => {
    //   (state.error = action.payload), (state.isLoading = false);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.currentUser=null;
        state.isLoading = false;
      });
  },
});

// export const {
//   signInStart,
//   signInSuccess,
//   signInFailure,
//   signOutStart,
//   signOutSuccess,
//   signOutFailure,
// } = authSlice.actions;
export default authSlice.reducer;
