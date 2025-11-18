import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      // ذخیره داخل LocalStorage
      localStorage.setItem("fakeUser", JSON.stringify(action.payload));
      state.user = action.payload;
      state.error = null;
      document.cookie = "auth=true; path=/";
    },
    loginUser: (state, action: PayloadAction<User>) => {
      const savedUser = localStorage.getItem("fakeUser");

      if (!savedUser) {
        state.error = "No User Has Been Registered";
        return;
      }

      const parsed = JSON.parse(savedUser);

      if (
        parsed.email === action.payload.email &&
        parsed.password === action.payload.password
      ) {
        state.user = parsed;
        state.isAuthenticated = true;
        state.error = null;
        document.cookie = "auth=true; path=/";
      } else {
        state.error = "Email Or Password Is Wrong";
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
       document.cookie = "auth=false; path=/";
    }
  }
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
