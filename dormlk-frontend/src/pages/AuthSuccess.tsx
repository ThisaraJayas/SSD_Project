// src/pages/AuthSuccess.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "@/lib/api.js";
import { setUser } from "@/Redux/Auth/AuthSlice.js"; // create this action if you don't have it

const AuthSuccess: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const run = async () => {
      try {
        // optional: if you sent any URL params, read them here from `location`
        const { data } = await api.get("/api/users/profile");
        // data should be your user payload; adjust to your API's shape
        dispatch(setUser(data));
        navigate("/", { replace: true });
      } catch (e) {
        // If cookie missing/invalid, send them to login
        navigate("/auth-failed", { replace: true });
      }
    };
    run();
  }, [dispatch, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Signing you in…</p>
    </div>
  );
};

export default AuthSuccess;
