"use client";

import React, { ReactNode } from "react";
import GridContainer from "./GridContainer";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";

interface RootLayoutPageProps {
  children: ReactNode;
}

const RootLayoutPage = ({ children }: RootLayoutPageProps) => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth"))
    return (
      <>
        <NavBar />
        <main>{children}</main>;
      </>
    );

  return (
    <GridContainer className="items-stretch relative">
      <main className="col-span-full lg:col-span-9 lg:order-2 min-h-screen px-2 py-6">
        {children}
      </main>
      <NavBar className="col-span-full lg:col-span-3 bottom-0 sticky z-50 lg:relative lg:order-1" />
    </GridContainer>
  );
};

export default RootLayoutPage;
