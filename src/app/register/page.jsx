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
  Tabs,
  Checkbox,
  Link,
} from "@heroui/react";
import {
  Person,
  Lock,
  Eye,
  EyeSlash,
  ArrowRight,
  Briefcase,
  Layers
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState("candidate");
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const dataSignin = Object.fromEntries(new FormData(e.currentTarget));

    if (selectedRole === "candidate" && !dataSignin.fullName) {
      setErrors({ fullName: "Please enter your full name." });
      setIsLoading(false);
      return;
    }

    if (selectedRole === "recruiter" && !dataSignin.companyName) {
      setErrors({ companyName: "Please enter your organization or company name." });
      setIsLoading(false);
      return;
    }

    if (!dataSignin.email.includes("@")) {
      setErrors({ email: "Please enter a valid business email address." });
      setIsLoading(false);
      return;
    }

    if (dataSignin.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters long." });
      setIsLoading(false);
      return;
    }

    if (!dataSignin.terms) {
      setErrors({ global: "You must agree to the Terms of Service and Privacy Policy to create an account." });
      setIsLoading(false);
      return;
    }

    try {
      const { fullName, companyName, email, password } = dataSignin;
      const name = selectedRole === "candidate" ? fullName : companyName;
      console.log(name , email , password);
      
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        type: selectedRole,
        callbackURL: "/"
      });
      console.log(data, error);
      if(data) {
        setErrors({});
        toast.success("Account created successfully!");
      } else if(error) {
        toast.error("Account creation failed: " + error.message);
      }
    }  finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-zinc-50 dark:bg-zinc-950">

      {/* Left Split Pane: Core Interactive Auth Container */}
      <div className="flex w-full items-center justify-center p-4 sm:p-8 lg:w-1/2">
        <div className="w-full max-w-105 space-y-6">

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Create an account
            </h1>
            <p className="text-sm text-default-500">
              Join HireLoop to kickstart your journey
            </p>
          </div>

          {/* HeroUI v3 Tabs */}
          <Tabs
            selectedKey={selectedRole}
            onSelectionChange={(key) => {
              setSelectedRole(key.toString());
              setErrors({});
            }}
            className="w-full"
          >
            <Tabs.ListContainer className="bg-default-100 p-1 rounded-xl w-full">
              <Tabs.List aria-label="Registration Roles" className="flex w-full justify-between gap-1">
                <Tabs.Tab
                  id="candidate"
                  className="flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all relative data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-50 text-default-500 data-[selected=true]:bg-white dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:shadow-sm cursor-pointer"
                >
                  Candidate
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab
                  id="recruiter"
                  className="flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all relative data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-50 text-default-500 data-[selected=true]:bg-white dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:shadow-sm cursor-pointer"
                >
                  <Tabs.Separator />
                  Recruiter
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="candidate" className="pt-2">
              <p className="text-xs text-default-400 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md w-fit font-medium">
                Apply to curated tech job opportunities instantly
              </p>
            </Tabs.Panel>
            <Tabs.Panel id="recruiter" className="pt-2">
              <p className="text-xs text-default-400 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md w-fit font-medium">
                Sourcing elite technical builders and designers
              </p>
            </Tabs.Panel>
          </Tabs>

          {/* Form Processing */}
          <Form className="flex flex-col gap-4" onSubmit={handleSubmit} validationBehavior="aria">

            {selectedRole === "candidate" && (
              <TextField
                name="fullName"
                isRequired
                isDisabled={isLoading}
                isInvalid={!!errors.fullName}
                className="w-full gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Full Name
                </Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Person className="text-default-400 text-lg mx-1" />
                  </InputGroup.Prefix>
                  <Input
                    placeholder="Alex Morgan"
                    className="w-full px-1 py-2 text-sm"
                    variant="primary"
                  />
                </InputGroup>
                <FieldError className="text-xs text-danger mt-1">
                  {errors.fullName}
                </FieldError>
              </TextField>
            )}

            {selectedRole === "recruiter" && (
              <TextField
                name="companyName"
                isRequired
                isDisabled={isLoading}
                isInvalid={!!errors.companyName}
                className="w-full gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Company Name
                </Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Layers className="text-default-400 text-lg mx-1" />
                  </InputGroup.Prefix>
                  <Input
                    placeholder="TechWave Labs"
                    className="w-full px-1 py-2 text-sm"
                    variant="primary"
                  />
                </InputGroup>
                <FieldError className="text-xs text-danger mt-1">
                  {errors.companyName}
                </FieldError>
              </TextField>
            )}

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
                  placeholder="name@company.com"
                  className="w-full px-1 py-2 text-sm"
                  variant="primary"
                />
              </InputGroup>
              <FieldError className="text-xs text-danger mt-1">
                {errors.email}
              </FieldError>
            </TextField>

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
                  placeholder="At least 6 characters"
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
                      <Eye className="text-lg text-default-400" />
                    ) : (
                      <EyeSlash className="text-lg text-default-400" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-danger mt-1">
                {errors.password}
              </FieldError>
            </TextField>

            {errors.global && (
              <p className="text-sm text-danger font-medium bg-danger-50 dark:bg-danger-950/30 p-3 rounded-xl border border-danger-200">
                {errors.global}
              </p>
            )}

            {/* Legal Agreement Checkbox (HeroUI v3 Custom Styled Square Border) */}
            <div className="flex flex-col gap-1.5 px-0.5 mt-2">
              <Checkbox
                name="terms"
                id="terms-checkbox"
                isRequired
                isDisabled={isLoading}
                className="flex items-start gap-3 select-none cursor-pointer group"
              >
                <Checkbox.Indicator
                  className="mt-0.5 h-4 w-4 rounded-md border-2 border-zinc-300 dark:border-zinc-700 bg-transparent transition-all duration-150 group-hover:border-zinc-400 group-focus-within:ring-2 group-focus-within:ring-primary group-focus-within:ring-offset-2 data-[checked=true]:bg-primary data-[checked=true]:border-primary"
                />
                <span className="text-sm leading-tight text-zinc-600 dark:text-zinc-400 group-data-[disabled=true]:opacity-50">
                  I agree to the{" "}
                  <Link href="#" size="sm" className="font-semibold text-primary hover:underline inline-flex">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" size="sm" className="font-semibold text-primary hover:underline inline-flex">
                    Privacy Policy
                  </Link>
                </span>
              </Checkbox>
            </div>

            <Button
              color="primary"
              size="lg"
              className="w-full font-semibold shadow-md shadow-indigo-500/10 mt-3 rounded-xl cursor-pointer"
              type="submit"
              isLoading={isLoading}
              endContent={!isLoading && <ArrowRight />}
            >
              Get Started as {selectedRole === "candidate" ? "Candidate" : "Recruiter"}
            </Button>
          </Form>

          <p className="text-center text-sm text-default-500">
            Already have an account?{" "}
            <Link size="sm" href="#" className="font-semibold hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </div>

      {/* Right Split Pane: Branding Showcase */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 text-white lg:flex">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
            <Briefcase className="text-xl" />
          </div>
          <span>HireLoop</span>
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Build your professional future with HireLoop.
          </h2>
          <p className="text-lg text-white/80">
            Set up a clean portfolio workspace, track real-time hiring updates, and link directly with global hiring leaders.
          </p>
        </div>
      </div>

    </div>
  );
}