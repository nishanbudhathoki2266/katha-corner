"use client";
import SectionContainer from "@/components/UI/SectionContainer";
import { getToken, getUserDetails } from "@/redux/reducerSlices/user";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import React from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { Button } from "@nextui-org/react";

const ProfilePage = () => {
  const user = useSelector(getUserDetails);

  console.log(user);

  return (
    <>
      {/* Profile section */}
      <SectionContainer className="p-4 lg:p-6 w-full flex flex-wrap items-start gap-4  border relative border-default-100 rounded-lg shadow-lg">
        <Avatar
          isBordered
          color="success"
          className="w-28 h-28 cursor-pointer"
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex gap-2 lg:gap-6 items-center text-sm">
            <h4>
              <span className="font-semibold">11</span> posts
            </h4>
            <h4>
              <span className="font-semibold">1k</span> followers
            </h4>
            <h4>
              <span className="font-semibold">12</span> followings
            </h4>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-col">
              <h1 className="text-lg text-default-600 font-semibold leading-tight">
                {user?.name}
              </h1>
              <span className="text-xs font-medium text-default-500">
                {user?.email}
              </span>
            </div>
            <Button size="sm" color="success">
              <MdEdit className="text-md text-background" />{" "}
              <span className="text-background text-md">Edit Profile</span>
            </Button>
          </div>

          {/* Bio Div */}
          <div>
            <h2 className="text-md text-default-600 font-semibold">Bio</h2>
            <p className="text-sm">{user?.bio}</p>
          </div>
        </div>
      </SectionContainer>

      {/* All Posts */}
      <SectionContainer className="p-4 min-h-screen lg:p-6 w-full flex flex-wrap items-start gap-4  border relative border-default-100 rounded-lg shadow-lg mt-4">
        All Posts here!
      </SectionContainer>
    </>
  );
};

export default ProfilePage;
