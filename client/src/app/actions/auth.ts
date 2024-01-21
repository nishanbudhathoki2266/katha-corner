"use server";
import { cookies } from "next/headers";

export async function signUp(formData: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  const res = await fetch("http://127.0.0.1:8000/api/v1/users/signup", {
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
}
