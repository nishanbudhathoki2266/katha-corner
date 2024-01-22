"use client";
import { Link } from "@nextui-org/link";
import { useForm, Controller } from "react-hook-form";
import validateEmail from "@/utils/ValidateEmail";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

interface FormValues {
  email: string;
  password: string;
}

const SignInForm = () => {
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
      // Reset form fields
      reset();
      router.push("/");
      toast.success("Signed up successfully!");
      toast.success(`${res.data.user.name}`);
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
