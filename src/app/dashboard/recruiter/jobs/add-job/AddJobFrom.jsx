"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Select,
  ListBox,
  Switch,
  Button,
  Card,
} from "@heroui/react";
import { Briefcase, FileText, Factory, Check } from "@gravity-ui/icons";
import { addNewJob } from "@/lib/action/job";
import { toast } from "react-toastify";

export default function AddJobFrom({company}) {
  const router = useRouter();

  // Mock Recruiter & Company Data
  // const companyData = {
  //   name: "TechLoop Inc.",
  //   isApproved: true,
  //   plan: "Free",
  //   activeJobsCount: 1,
  //   jobLimit: 3,
  // };
  // State handles Onsite vs Remote switching
  const [isOnsite, setIsOnsite] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Business logic guards
  // const isLimitReached = companyData.activeJobsCount >= companyData.jobLimit;
  // const canPost = companyData.isApproved && !isLimitReached;
  
  const isLimitReached = false
  const canPost = true

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;

    setIsLoading(true);

    const formElement = e.currentTarget;
    const rawFormData = new FormData(formElement);

    // Safely extract payload via destructuring to preserve exact schema types
    const {
      title,
      category,
      type,
      minSalary,
      maxSalary,
      currency,
      city,
      country,
      deadline,
      responsibilities,
      requirements,
      benefits
    } = Object.fromEntries(rawFormData);

    // Explicit Schema-Typed Payload Construction
    const payload = {
      title: title?.toString().trim(),
      category: category?.toString(),
      type: type?.toString(),
      minSalary: minSalary ? Number(minSalary) : 0,
      maxSalary: maxSalary ? Number(maxSalary) : 0,
      currency: currency?.toString(),
      city: isOnsite ? city?.toString().trim() : "Remote",
      country: isOnsite ? country?.toString().trim() : "Remote",
      deadline: deadline?.toString(),
      responsibilities: responsibilities?.toString().trim(),
      requirements: requirements?.toString().trim(),
      benefits: benefits ? benefits.toString().trim() : "",
      isRemote: !isOnsite,
      companyId: company._id,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    // Logging typed structural payload 
    console.log("Verified Form Submission Payload:", payload);
    const data = await addNewJob(payload)
    // Simulate standard server write cycle latency
    if (data.insertedId) {
      toast.success('Job added successful')
      formElement.reset();
      setIsOnsite(true);
      setIsLoading(false);
      setTimeout(() => {

        // Clean redirect to dashboard tracking board
        router.push("/dashboard/recruiter/jobs");
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Post a New Job</h1>
        <p className="text-default-500 mt-2">Create your listing using Hero UI v3 structured elements.</p>
      </div>

      {/* Company Plan Check Card Layout */}
      <Card className="w-full mb-8 p-4 bg-default-50/50" shadow="sm">
        <Card.Header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2">
          <div className="flex items-center gap-3">
            <Factory className="text-primary size-6" />
            <div>
              <Card.Title className="text-base font-semibold">Posting as: {company.name}</Card.Title>
              <Card.Description className="text-xs">
                Plan Level: <span className="text-primary font-semibold">{company?.plan}</span> ({company?.activeJobsCount}/{company?.jobLimit} active slots used)
              </Card.Description>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!company?.isApproved && (
              <span className="text-xs font-medium text-danger bg-danger-50 px-3 py-1 rounded-full">
                Verification Pending
              </span>
            )}
            {isLimitReached && company?.isApproved && (
              <span className="text-xs font-medium text-warning bg-warning-50 px-3 py-1 rounded-full">
                Job Count Limit Reached
              </span>
            )}
          </div>
        </Card.Header>
      </Card>

      {/* Strict Validation Layout Wrapper */}
      <Form
        className="space-y-8 w-full"
        onSubmit={onSubmit}
        validationBehavior="native" // Standard browser validation API integration
      >

        {/* SECTION 1: JOB INFO */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="text-primary size-5" />
            <h2 className="text-xl font-bold text-foreground">Job Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField isRequired name="title" type="text">
              <Label>Job Title</Label>
              <Input placeholder="e.g. Senior Frontend Engineer" />
              <FieldError className="text-xs text-danger mt-1" />
            </TextField>

            <Select className="w-full" name="category" placeholder="Select job domain" isRequired>
              <Label>Job Category</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="engineering" textValue="Engineering">Engineering <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="design" textValue="Design">Design <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="marketing" textValue="Marketing">Marketing <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="sales" textValue="Sales">Sales <ListBox.ItemIndicator /></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select className="w-full" name="type" placeholder="Select runtime" isRequired>
              <Label>Job Type</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Full-time" textValue="Full-time">Full-time <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="Part-time" textValue="Part-time">Part-time <ListBox.ItemIndicator /></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Custom Validator ensuring negative sums are rejected */}
            <TextField
              isRequired
              name="minSalary"
              type="number"
              validate={(value) => Number(value) < 0 ? "Salary floor cannot be a negative value" : null}
            >
              <Label>Min Salary</Label>
              <Input placeholder="0" min="0" />
              <FieldError className="text-xs text-danger mt-1" />
            </TextField>

            <TextField
              isRequired
              name="maxSalary"
              type="number"
              validate={(value) => Number(value) < 0 ? "Salary ceiling cannot be a negative value" : null}
            >
              <Label>Max Salary</Label>
              <Input placeholder="0" min="0" />
              <FieldError className="text-xs text-danger mt-1" />
            </TextField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Select className="w-full" name="currency" placeholder="Select currency" isRequired>
              <Label>Currency</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="USD" textValue="USD ($)">USD ($) <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="EUR" textValue="EUR (€)">EUR (€) <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="GBP" textValue="GBP (£)">GBP (£) <ListBox.ItemIndicator /></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* City Field: Dynamic validation state changes based on isOnsite */}
            <TextField name="city" type="text" isRequired={isOnsite}>
              <Label>City</Label>
              <Input placeholder={!isOnsite ? "Remote" : "e.g. San Francisco"} disabled={!isOnsite} />
              <FieldError className="text-xs text-danger mt-1" />
            </TextField>

            {/* Country Field: Dynamic validation state changes based on isOnsite */}
            <TextField name="country" type="text" isRequired={isOnsite}>
              <Label>Country</Label>
              <Input placeholder={!isOnsite ? "Remote" : "e.g. USA"} disabled={!isOnsite} />
              <FieldError className="text-xs text-danger mt-1" />
            </TextField>
          </div>

          {/* Dynamic Switch Component */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 pb-2">
            <div className="w-full sm:w-auto">
              <Switch
                isSelected={isOnsite}
                onChange={() => setIsOnsite(!isOnsite)}
                color="primary"
                aria-label={isOnsite ? "Requires physical onsite location" : "Fully remote position"}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Content>
                  <span className="text-sm font-medium text-default-600 select-none min-w-65 inline-block">
                    {isOnsite
                      ? "This requires a physical onsite location"
                      : "This is a fully remote position"
                    }
                  </span>
                </Switch.Content>
              </Switch>
            </div>

            <div className="w-full sm:w-72">
              <TextField isRequired name="deadline" type="date">
                <Label>Application Deadline</Label>
                <Input />
                <FieldError className="text-xs text-danger mt-1" />
              </TextField>
            </div>
          </div>
        </div>

        {/* SECTION 2: JOB DESCRIPTION */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-primary size-5" />
            <h2 className="text-xl font-bold text-foreground">Job Description</h2>
          </div>

          {/* Rich content character length validation bounds */}
          <TextField
            isRequired
            name="responsibilities"
            type="text"
            validate={(value) => value.trim().length < 20 ? "Please outline descriptive responsibilities (min 20 characters)." : null}
          >
            <Label>Responsibilities</Label>
            <Input as="textarea" className="min-h-25 py-2" placeholder="Outline day-to-day responsibilities..." />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          <TextField
            isRequired
            name="requirements"
            type="text"
            validate={(value) => value.trim().length < 20 ? "Please detail explicit requirements (min 20 characters)." : null}
          >
            <Label>Requirements</Label>
            <Input as="textarea" className="min-h-25 py-2" placeholder="List required skills, experience, and education..." />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>

          <TextField name="benefits" type="text">
            <Label>Benefits (Optional)</Label>
            <Input as="textarea" className="min-h-20 py-2" placeholder="Health insurance, remote stipends, equity packages..." />
            <FieldError className="text-xs text-danger mt-1" />
          </TextField>
        </div>

        {/* Action Button Controls */}
        <div className="pt-6 flex justify-end gap-2">
          <Button
            type="submit"
            color={canPost ? "primary" : "default"}
            size="lg"
            isDisabled={!canPost}
            isLoading={isLoading}
            className="font-medium px-8"
          >
            {isLoading ? null : <Check className="size-4 mr-1" />}
            {isLimitReached ? "Limit Exceeded" : "Publish Job Post"}
          </Button>
        </div>

      </Form>
    </div>
  );
}