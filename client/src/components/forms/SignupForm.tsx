"use client";

import React from "react";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useForm, Controller } from "react-hook-form";

const validateEmail = (value: string) => {
  if (!value) {
    return "Email is required";
  }

  const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(value)) {
    return "Please enter a valid email address!";
  }

  return true;
};

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  console.log(errors);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
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
        rules={{ required: "Please provide your password!" }}
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
      <Button type="submit" color="success" isLoading={false}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
