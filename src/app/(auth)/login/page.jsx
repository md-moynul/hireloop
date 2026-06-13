"use client";

import React from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  InputGroup,
  FieldError,
  Button,
  Checkbox,
  Link,
 
} from "@heroui/react";
import {
  Person,
  Lock,
  Eye,
  EyeSlash,
  ArrowRight,
  Briefcase
} from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { redirect, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirected') || "/"
  

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Read form inputs natively using the modern FormData API
    const LoginData = Object.fromEntries(new FormData(e.currentTarget));

    // Front-end validation checks
    if (!LoginData.email.includes("@")) {
      setErrors({ email: "Please enter a valid email address." });
      setIsLoading(false);
      return;
    }

    if (LoginData.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters long." });
      setIsLoading(false);
      return;
    }

    try {
      // Connect your authenticating API route endpoint here
      console.log("Authenticating user:", LoginData);
      const { email, password, rememberMe } = LoginData
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: rememberMe === "on" ? true : false,
      });
      
      
      if(data) {
        toast.success("Login successful");
        redirect(`${redirectTo}`)
      }else if(error) {
        toast.error("Login failed: " + error.message);
        console.log(error);
        
      }

    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-zinc-50 dark:bg-zinc-950">

      {/* Left Split Pane: Branding Showcase (Hidden on Mobile viewports) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 text-white lg:flex">
        {/* Vector layout grid mesh accent background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Top Header Identity Brand Wrapper */}
        <div className="relative z-10 flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
            <Briefcase className="text-xl" />
          </div>
          <span>HireLoop</span>
        </div>

        {/* Informational Hero Copy */}
        <div className="relative z-10 max-w-md space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Connecting exceptional talent with world-class teams.
          </h2>
          <p className="text-lg text-white/80">
            Post opportunities, track applications, and accelerate your recruitment pipeline effortlessly.
          </p>
        </div>

        {/* Copyright Section Footnote */}
        <div className="relative z-10 text-sm text-white/60">
          © {new Date().getFullYear()} HireLoop. All rights reserved.
        </div>
      </div>

      {/* Right Split Pane: Core Interactive Auth Container */}
      <div className="flex w-full items-center justify-center p-4 sm:p-8 lg:w-1/2">
        <div className="w-full max-w-105 space-y-6">

          {/* Main Context Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome back
            </h1>
            <p className="text-sm text-default-500">
              Enter your credentials to access your workspace
            </p>
          </div>
          {/* Core Access Form Fields Container */}
          <Form className="flex flex-col gap-5 mt-4" onSubmit={handleSubmit} validationBehavior="aria">

            {/* Email Field Block Flow (Matched with Register Page Placeholder) */}
            <TextField
              name="email"
              type="email"
              isRequired
              isDisabled={isLoading}
              isInvalid={!!errors.email}
              className="w-full gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email Address
              </Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Person className="text-default-400 text-lg mx-1" />
                </InputGroup.Prefix>
                <Input
                  placeholder="Enter your email address"
                  className="w-full px-1 py-2 text-sm"
                  variant="primary"
                />
              </InputGroup>
              <FieldError className="text-xs text-danger mt-1">
                {errors.email}
              </FieldError>
            </TextField>

            {/* Password Field Block Flow */}
            <TextField
              name="password"
              isRequired
              isDisabled={isLoading}
              isInvalid={!!errors.password}
              className="w-full gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Lock className="text-default-400 text-lg mx-1" />
                </InputGroup.Prefix>
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-1 py-2 text-sm"
                  variant="primary"
                />
                <InputGroup.Suffix>
                  <button
                    onClick={toggleVisibility}
                    type="button"
                    className="focus:outline-none p-1 rounded hover:bg-default-100 transition-colors mr-1 cursor-pointer"
                  >
                    {isVisible ? (
                      <EyeSlash className="text-lg text-default-400" />
                    ) : (
                      <Eye className="text-lg text-default-400" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-danger mt-1">
                {errors.password}
              </FieldError>
            </TextField>

            {/* Alert container for structural API errors */}
            {errors.global && (
              <p className="text-sm text-danger font-medium bg-danger-50 dark:bg-danger-950/30 p-3 rounded-xl border border-danger-200">
                {errors.global}
              </p>
            )}

            {/* Remember Me & Password Recovery Actions */}
            <div className="flex justify-between items-center px-0.5 mt-1">
              <Checkbox
                name="rememberMe"
                id="remember-me-checkbox"
                isDisabled={isLoading}
                className="flex items-center gap-3 select-none cursor-pointer group"
              >
                <Checkbox.Indicator
                  className="h-4 w-4 rounded-md border-2 border-zinc-300 dark:border-zinc-700 bg-transparent transition-all duration-150 group-hover:border-zinc-400 group-focus-within:ring-2 group-focus-within:ring-primary group-focus-within:ring-offset-2 LoginData-[checked=true]:bg-primary LoginData-[checked=true]:border-primary"
                />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-LoginData-[disabled=true]:opacity-50">
                  Remember me
                </span>
              </Checkbox>

              <Link color="primary" href="#" size="sm" className="font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Action Interface Dispatch Button */}
            <Button
              color="primary"
              size="lg"
              className="w-full font-semibold shadow-md shadow-indigo-500/10 mt-2 rounded-xl cursor-pointer"
              type="submit"
              isLoading={isLoading}
              endContent={!isLoading && <ArrowRight />}
            >
              LogIn
            </Button>
          </Form>

          {/* Action Hub Redirect Navigation Footer link */}
          <p className="text-center text-sm text-default-500">
            Do not have an account?{" "}
            <Link size="sm" href={`/register?redirected=${redirectTo}`} className="font-semibold hover:underline">
              Create an account
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}