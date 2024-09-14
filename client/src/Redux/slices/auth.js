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
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/profile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/users/profile", credentials);
      return response.data;
    } catch (error) {    
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout:(state)=>{
      state.currentUser=null,
      state.error=null,
      state.isLoading=false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error=null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.currentUser=null;
        state.isLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
