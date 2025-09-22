import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import { register } from "@/Redux/Auth/AuthAction.ts";
import Footer from "@/PageComponents/Footer.tsx";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.User);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [triedRegister, setTriedRegister] = useState(false); // NEW

  const isLoading = status === "loading";
  const isSucceeded = status === "succeeded";
  const isFailed = status === "failed";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError("Password should be at least 8 characters");
      return;
    }
    setError("");
    setTriedRegister(true); // user attempted a registration
    dispatch(register(formData));
  };

  // ✅ Navigate only after register success
  useEffect(() => {
    if (isSucceeded) navigate("/login", { replace: true });
  }, [isSucceeded, navigate]);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, #75ff70, #00a59d, #fdbb2d)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 0,
        margin: 0,
      }}
    >
      <div className="mt-24 md:mt-[10%] mb-[9%]">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert mb="10px" status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}

            {triedRegister && isFailed && !error && (
              <Alert mb="10px" status="error">
                <AlertIcon />
                Registration failed. Please try again.
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="Kamal"
                    maxLength={50}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Silva"
                    maxLength={50}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="At least 8 characters"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create an account"}
              </Button>

              <div className="flex items-center my-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="px-3 text-xs text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google sign up is just Google OAuth sign-in */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
                onClick={() => {
                  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
                }}
                disabled={isLoading}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  className="h-5 w-5"
                  loading="lazy"
                />
                Continue with Google
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
