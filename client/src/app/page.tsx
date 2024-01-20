"use client";

import { useRouter } from "next/navigation";
import React from "react";

const HomePage = () => {
  const router = useRouter();

  router.push("/auth/sign-up");
  return <h1>WELCOME TO KATHA CORNER</h1>;
};

export default HomePage;
