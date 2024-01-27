"use client";
import React from "react";

import { Link } from "@nextui-org/link";
import NAV_LINKS from "@/consts/Navlinks";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import Logo from "./Logo";
import { ThemeToggler } from "./ThemeToggler";

interface NavBarProps {
  className?: string;
}

const NavBar = ({ className = "" }: NavBarProps) => {
  const pathname = usePathname();

  console.log("PATHNAME FROM PROFILE ", pathname);

  // Because I don't want to show navigation on login and register page
  if (pathname.startsWith("/auth"))
    return (
      <Navbar>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          <NavbarItem>
            <ThemeToggler />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarItem>
            <Link href="/auth/sign-in" color="foreground">
              Sign In
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="success"
              href="/auth/sign-up"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeToggler />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Link
              className="w-full"
              color="foreground"
              href="/auth/sign-up"
              size="lg"
            >
              Sign Up
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full"
              color="foreground"
              href="/auth/sign-in"
              size="lg"
            >
              Sign In
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );

  return (
    <nav
      className={`bg-success w-full flex lg:flex-col lg:gap-4 p-2 lg:p-6 overflow-x-auto ${className}`}
    >
      <div className="hidden w-full lg:flex lg:flex-col items-center justify-center gap-2">
        <Avatar
          isBordered
          color="success"
          className="w-28 h-28 text-large"
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <h1 className="text-md text-background font-medium tracking-wide">
          Nishan Budhathoki
        </h1>
      </div>
      {NAV_LINKS.map((navLink) => (
        <Link
          key={navLink.name}
          href={navLink.path}
          className={`flex items-center justify-center lg:justify-start w-full py-2 px-4 rounded-lg gap-4 transition-all duration-300 ${
            pathname === navLink.path
              ? "text-success-900 bg-background"
              : "text-background"
          }`}
        >
          <span className="text-xl">{navLink.icon}</span>
          <span className="hidden lg:inline">{navLink.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
