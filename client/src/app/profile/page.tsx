"use client";
import SectionContainer from "@/components/UI/SectionContainer";
import { getUserDetails } from "@/redux/reducerSlices/user";
import { Avatar } from "@nextui-org/avatar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import PostCard from "@/components/posts/PostCard";
import { getProfileById } from "../actions/users";
import toast from "react-hot-toast";

interface ApiResponseSuccess {
  _id: string;
  name: string;
  email: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
  const userId = useSelector(getUserDetails)?._id;

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<ApiResponseSuccess | null>(null);

  const fetchUserInfo = async () => {
    if (!userId) return;

    const res = await getProfileById(userId);

    setIsLoading(false);

    if (res.status === "success" && res.data) {
      setUser(res.data?.user);
    } else {
      res.message && toast.error(res.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Profile section */}
      <SectionContainer className="p-4 lg:p-6 w-full flex flex-wrap items-start gap-4  border relative border-default-100 rounded-lg shadow-lg">
        {isLoading ? (
          <>
            <Skeleton className="w-28 h-28 rounded-full" />

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex gap-2 lg:gap-6 items-center text-sm">
                <Skeleton className="p-2 rounded-xl w-16" />
                <Skeleton className="p-2 rounded-xl w-16" />
                <Skeleton className="p-2 rounded-xl w-16" />
              </div>
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex w-32 gap-1 flex-col">
                  <Skeleton className="p-3 rounded-xl flex-1" />
                  <Skeleton className="p-2 rounded-xl flex-1" />
                </div>
                <Skeleton className="w-20 p-4 rounded-xl"></Skeleton>
              </div>

              {/* Bio Div */}
              <div className="flex flex-col gap-2">
                <Skeleton className="p-2 w-8 rounded-xl" />
                <Skeleton className="p-6 rounded-xl" />
              </div>
            </div>
          </>
        ) : (
          <>
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
                  <span className="font-semibold">12</span> following
                </h4>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex flex-col">
                  <Skeleton isLoaded={!isLoading} className="rounded-lg">
                    <h1 className="text-lg text-default-600 font-semibold leading-tight">
                      {user?.name}
                    </h1>
                  </Skeleton>
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
          </>
        )}
      </SectionContainer>

      {/* All Posts */}
      <SectionContainer className="p-4 min-h-screen lg:p-6 border border-default-100 rounded-lg shadow-lg mt-4 flex flex-col gap-4">
        <h1 className="text-lg text-default-600 font-semibold leading-tight">
          Your Posts
        </h1>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </SectionContainer>
    </>
  );
};

export default ProfilePage;
