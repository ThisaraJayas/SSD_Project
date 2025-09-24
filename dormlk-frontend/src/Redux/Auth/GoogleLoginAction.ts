// Redux/Auth/GoogleLoginAction.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (token: string, { rejectWithValue }) => {
    try {
      // Optionally, you can fetch user profile using the token
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch user profile");

      const data = await res.json();

      // Save token together with user info
      return { ...data, token };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
