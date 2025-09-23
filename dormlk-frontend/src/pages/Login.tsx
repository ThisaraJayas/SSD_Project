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
import { login } from "@/Redux/Auth/AuthAction.ts";
import Footer from "@/PageComponents/Footer.tsx";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.User);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const isLoading = status === "loading";
  const isFailed = status === "failed";
  const isSucceeded = status === "succeeded";

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      dispatch(login(formData));
      setIsSubmitted(true);
    }
  };

  // ✅ Navigate after status changes (avoid navigating in render)
  useEffect(() => {
    if (isSucceeded) navigate("/", { replace: true });
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
      {/* Remove <DefaulltHeader /> here if you already render it in App.tsx */}
      <div className="mt-24 md:mt-[10%] mb-[9%]">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email to login</CardDescription>
          </CardHeader>

          <CardContent>
            {isSubmitted && isFailed && (
              <Alert mb={"5px"} status="error">
                <AlertIcon />
                Invalid email or password.
              </Alert>
            )}

            <form onSubmit={handleLoginSubmit} className="grid gap-4">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>

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
                {isLoading ? "Please wait…" : "Continue with Google"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
