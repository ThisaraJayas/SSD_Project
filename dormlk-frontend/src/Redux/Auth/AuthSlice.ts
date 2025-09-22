// src/Redux/Auth/AuthSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUser,
  login,
  logout,
  passwordChange,
  register,
} from "./AuthAction.js";
import { googleLogin } from "@/Redux/Auth/GoogleLoginAction.js"; // keep only if you actually use it programmatically

// User shape stored in the client (no password here)
export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  userType: "REGULAR" | "ADMIN";
  avatar?: string;
  provider?: "LOCAL" | "GOOGLE";
}

interface UserState {
  loginUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: UserState = {
  loginUser: null,
  status: "idle",
  error: null,
};

export const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use this after OAuth redirect success to place the user in state
    setUser(state, action: PayloadAction<User | null>) {
      state.loginUser = action.payload;
      state.status = action.payload ? "succeeded" : "idle";
      state.error = null;
    },
    // Local state clear (pair with backend /logout that clears cookie)
    logoutLocal(state) {
      state.loginUser = null;
      state.status = "idle";
      state.error = null;
    },
    // Optional: set loading state explicitly (e.g., while hydrating on app load)
    setLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    // Optional: record an error
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload ?? null;
      state.status = action.payload ? "failed" : state.status;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(register.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loginUser = action.payload as User;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action as any).error?.message ?? "Registration failed";
    });

    // login (LOCAL credentials)
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loginUser = action.payload as User;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action as any).error?.message ?? "Login failed";
    });

    // getUser (hydrate from /profile using cookie)
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loginUser = action.payload as User;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action as any).error?.message ?? "Fetch user failed";
    });

    // password change
    builder.addCase(passwordChange.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(passwordChange.fulfilled, (state, action) => {
      state.loginUser = action.payload as User;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(passwordChange.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action as any).error?.message ?? "Password change failed";
    });

    // logout (server clears cookie)
    builder.addCase(logout.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "succeeded";
      state.loginUser = null;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      // Even if server fails, clear locally to avoid sticky auth
      state.loginUser = null;
      state.status = "failed";
      state.error = (action as any).error?.message ?? "Logout failed";
    });

    // Google login (ONLY if you use a thunk that exchanges a code/token directly)
    builder.addCase(googleLogin.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loginUser = action.payload as User;
      state.error = null;
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action as any).error?.message ?? "Google login failed";
    });
  },
});

export const { setUser, logoutLocal, setLoading, setError } = AuthSlice.actions;
export default AuthSlice.reducer;
