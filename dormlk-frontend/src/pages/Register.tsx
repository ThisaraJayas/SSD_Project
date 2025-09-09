import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Link, useNavigate } from "react-router-dom";
import DefaulltHeader from "@/PageComponents/DefaulltHeader.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import { register } from "@/Redux/Auth/AuthAction.ts";
import Footer from "@/PageComponents/Footer.tsx";


export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { loginUser , status} = useSelector((state: RootState) => state.User);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError("Password should be longer than 8 characters");
      return;
    }
    dispatch(register(formData))
    };

    

    if(status=='loading'){
      console.log("loading..");
    }else if(status=='succeeded'){
      navigate('/login')
    }else{
      console.log("Error Mesage");
      
    }

  return (
    <div>
    <div style={{background: 'linear-gradient(to bottom right, #75ff70, #00a59d, #fdbb2d)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0, margin: 0 }}>
    <DefaulltHeader />
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
              <Alert mb={'10px'} status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e)=>setFormData({...formData, firstName:e.target.value})}
                    placeholder="Kamal"
                    maxLength={50}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name"
                  maxLength={50}
                  value={formData.lastName}
                  onChange={(e)=>setFormData({...formData, lastName:e.target.value})}
                   placeholder="Silva" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                    onChange={(e)=>setFormData({...formData, email:e.target.value})}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password"
                value={formData.password}
                onChange={(e)=>setFormData({...formData, password:e.target.value})}
                type="password" />
              </div>
              <Button
                type="submit"
                className="w-full  bg-emerald-500 hover:bg-emerald-600"
              >
                Create an account
              </Button>
              {/* <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
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
      <Footer/>
    </div>
    </div>
  );
}
