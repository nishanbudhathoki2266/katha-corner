"use server";
import { cookies } from "next/headers";

export async function signUp(formData: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  bio?: string;
  gender: "male" | "female" | "others";
  dob: Date;
}) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/signUp", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      cookies().set("jwt", data.token);
    }

    return data;
  } catch (err: unknown) {
    return {
      status: "fail",
      message: "Something went wrong!",
    };
  }
}

export async function signIn(formData: { email: string; password: string }) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/signin", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      cookies().set("jwt", data.token);
    }

    return data;
  } catch (err: unknown) {
    return {
      status: "fail",
      message: "Something went wrong!",
    };
  }
}
