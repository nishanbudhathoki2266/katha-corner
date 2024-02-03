"use client";

import React from "react";

import { Skeleton } from "@nextui-org/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="w-full border border-background-100 dark:border-gray-800 p-2 rounded-2xl shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="flex flex-col gap-1 items-start justify-center">
            <Skeleton className="rounded-lg p-2 w-32" />
            <Skeleton className="rounded-lg p-1 w-24" />
          </div>
        </div>
        <Skeleton className="rounded-lg p-4 w-24" />
      </div>

      <Skeleton className="px-3 my-2 py-0 rounded-lg p-12 max-w-2xl w-full" />

      <div className="flex items-center gap-3">
        <Skeleton className="rounded-lg p-2 max-w-2xl w-20" />
        <Skeleton className="rounded-lg p-2 max-w-2xl w-20" />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
