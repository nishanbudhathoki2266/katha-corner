"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useForm, Controller } from "react-hook-form";
import validateEmail from "@/utils/ValidateEmail";
import toast from "react-hot-toast";
import { signUp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (formData: FormValues) => {
    const { fullName, email, password, passwordConfirm } = formData;
    setLoading(true);
    const res = await signUp({
      name: fullName,
      email,
      password,
      passwordConfirm,
    });

    setLoading(false);
    if (res.status === "success") {
      // Reset form fields
      reset();
      router.push("/");
      toast.success("Signed up successfully!");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Full name field */}
      <Controller
        control={control}
        name="fullName"
        rules={{
          required: "Please provide your full name!",
        }}
        render={({ field: { onChange } }) => (
          <Input
            type="text"
            size="md"
            label="Full Name"
            variant="bordered"
            isInvalid={errors?.fullName ? true : false}
            errorMessage={errors?.fullName?.message}
            onChange={onChange}
          />
        )}
      />

      {/* Email field */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Please enter your email!",
          validate: validateEmail,
        }}
        render={({ field: { onChange } }) => (
          <Input
            type="text"
            size="md"
            label="Email"
            variant="bordered"
            isInvalid={errors?.email ? true : false}
            errorMessage={errors?.email?.message}
            onChange={onChange}
          />
        )}
      />

      {/* Password field */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Please provide your password!",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long!",
          },
        }}
        render={({ field: { onChange } }) => (
          <Input
            type="password"
            size="md"
            label="Password"
            variant="bordered"
            isInvalid={errors?.password ? true : false}
            errorMessage={errors?.password?.message}
            onChange={onChange}
          />
        )}
      />

      {/* Confirm Password field */}
      <Controller
        control={control}
        name="passwordConfirm"
        rules={{
          required: "You must confirm your password!",
          validate: (val, formValues) =>
            val === formValues.password
              ? true
              : "Your two passwords didn't match!",
        }}
        render={({ field: { onChange } }) => (
          <Input
            type="password"
            size="md"
            label="Confirm Password"
            variant="bordered"
            isInvalid={errors?.passwordConfirm ? true : false}
            errorMessage={errors?.passwordConfirm?.message}
            onChange={onChange}
          />
        )}
      />

      {/* Agree to terms and conditions text */}
      <p className="text-sm text-justify font-normal">
        By signing up you agree to our{" "}
        <Link className="text-sm" href="#" color="success">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link className="text-sm" href="#" color="success">
          Privacy policy
        </Link>{" "}
        and confirm that you are at least 18 years old.
      </p>

      {/* Sign Up Button */}
      <Button type="submit" color="success" isLoading={loading}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
