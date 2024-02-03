"use client";

import React, { useState } from "react";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import validateEmail from "@/utils/ValidateEmail";
import { signIn, signUp } from "@/app/actions/auth";
import { setUserInfo } from "@/redux/reducerSlices/user";

interface FormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (formData: FormValues) => {
    const { email, password } = formData;
    setLoading(true);
    const res = await signIn({
      email,
      password,
    });

    setLoading(false);
    if (res.status === "success") {
      dispatch(setUserInfo(res));
      reset();
      router.push("/");
      toast.success("Welcome back!");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
            isRequired
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
            isRequired
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

      {/* Sign In Button */}
      <Button color="success" type="submit" isLoading={loading}>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
