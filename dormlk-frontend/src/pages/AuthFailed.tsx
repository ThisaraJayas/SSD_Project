// src/pages/AuthFailed.tsx
import React from "react";
import { Link } from "react-router-dom";

const AuthFailed: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Sign in failed</h1>
      <p className="text-gray-600">Please try again.</p>
      <Link className="underline" to="/login">
        Back to login
      </Link>
    </div>
  );
};

export default AuthFailed;
