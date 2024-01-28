"use client";
import SectionContainer from "@/components/UI/SectionContainer";
import { getToken, getUserDetails } from "@/redux/reducerSlices/user";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector(getUserDetails);

  console.log(user);

  return (
    <>
      <SectionContainer>
        <h1>{user?.name}</h1>
      </SectionContainer>
    </>
  );
};

export default ProfilePage;
