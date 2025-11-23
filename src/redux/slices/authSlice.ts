// app/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: User, thunkAPI) => {
    const saved = localStorage.getItem("fakeUser");
    console.log("saved", saved);
    
    if (!saved) {
      return thunkAPI.rejectWithValue("No User Has Been Registered");
    }

    const parsed = JSON.parse(saved);

    if (parsed.email === payload.email && parsed.password === payload.password) {
      document.cookie = "auth=true; path=/";
      return parsed;
    }

    return thunkAPI.rejectWithValue("Email Or Password Is Wrong");
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: User) => {
    localStorage.setItem("fakeUser", JSON.stringify(payload));
    document.cookie = "auth=true; path=/";
    return payload;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      document.cookie = "auth=false; path=/";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
  },
});

export const { logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer;