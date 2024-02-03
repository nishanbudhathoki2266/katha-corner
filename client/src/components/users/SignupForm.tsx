"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { signUp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import validateEmail from "@/utils/ValidateEmail";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { setUserInfo } from "@/redux/reducerSlices/user";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  bio?: string;
  gender: "male" | "female" | "others";
  dob: {
    startDate: string;
    endDate: string;
  };
}

const SignupForm = () => {
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
    const { fullName, email, password, passwordConfirm, bio, gender, dob } =
      formData;

    setLoading(true);
    const res = await signUp({
      name: fullName,
      email,
      password,
      passwordConfirm,
      bio,
      gender,
      dob: new Date(dob.startDate),
    });

    setLoading(false);
    if (res.status === "success") {
      reset();
      dispatch(setUserInfo(res));
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
            isRequired
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
            isRequired
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

      {/* Bio field */}
      <Controller
        control={control}
        name="bio"
        rules={{
          maxLength: {
            value: 150,
            message: "Only 150 or less characters allowed!",
          },
        }}
        render={({ field: { onChange } }) => (
          <Textarea
            variant="bordered"
            label="Bio"
            labelPlacement="inside"
            isInvalid={errors?.bio ? true : false}
            errorMessage={errors?.bio?.message}
            onChange={onChange}
          />
        )}
      />

      {/* Gender */}
      <Controller
        control={control}
        name="gender"
        rules={{
          required: "Please provide your gender!",
        }}
        render={({ field: { onChange } }) => (
          <Select
            variant="bordered"
            placeholder="Select your gender"
            isRequired
            label="Gender"
            onChange={onChange}
            isInvalid={errors?.gender ? true : false}
            errorMessage={errors?.gender?.message}
          >
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
            <SelectItem key="others">Others</SelectItem>
          </Select>
        )}
      />

      {/* DOB */}
      <Controller
        control={control}
        name="dob"
        rules={{
          required: "Please provide your Date of Birth!",
        }}
        render={({ field: { value, onChange } }) => (
          <>
            <Datepicker
              primaryColor={"green"}
              maxDate={new Date(Date.now())}
              inputClassName={
                "w-full rounded-lg p-2 border-2 border-gray-200 dark:border-gray-500 bg-transparent"
              }
              placeholder="Date of Birth"
              useRange={false}
              asSingle={true}
              onChange={onChange}
              // @ts-ignore
              value={value}
            />
            {errors?.dob && (
              <p className="text-small text-red-500">{errors?.dob?.message}</p>
            )}
          </>
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
