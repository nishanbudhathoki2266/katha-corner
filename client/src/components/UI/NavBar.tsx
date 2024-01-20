"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { ThemeToggler } from "./ThemeToggler";
import Logo from "./Logo";

const NavBar = () => {
  const pathname = usePathname();

  //   Because I don't want to show navigation on login and register page
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

  return <div>NavBar</div>;
};

export default NavBar;
