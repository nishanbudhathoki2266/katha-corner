"use client";
import SectionContainer from "@/components/UI/SectionContainer";
import { getToken, getUserDetails } from "@/redux/reducerSlices/user";
import { Image } from "@nextui-org/image";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector(getUserDetails);

  console.log(user);

  return (
    <>
      <SectionContainer className="p-6 flex flex-col justify-center gap-4 border relative border-default-100 rounded-lg shadow-lg">
        {/* <Image
          isZoomed
          width={150}
          alt="NextUI Fruit Image with Zoom"
          src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
        /> */}

        {/* name-email div */}
        <div>
          <h1 className="text-lg text-default-600 font-semibold">
            {user?.name}
          </h1>
          <span className="text-sm text-default-500">{user?.email}</span>
        </div>

        {/* Bio Div */}
        <div>
          <h2 className="text-md text-default-600 font-semibold">Bio</h2>
          <p className="text-sm">{user?.bio}</p>
        </div>
      </SectionContainer>
    </>
  );
};

export default ProfilePage;
