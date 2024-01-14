"use client";

import React from "react";
import { NextUIProvider as Provider } from "@nextui-org/react";

interface NextUIProviderProps {
  children: React.ReactNode;
}

const NextUIProvider = ({ children }: NextUIProviderProps) => {
  return <Provider>{children}</Provider>;
};

export default NextUIProvider;
