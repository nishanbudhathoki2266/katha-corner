import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-xs md:text-md p-1 border-2 border-success flex rounded-lg gap-1 items-center"
    >
      <span className="bg-success uppercase text-white p-1 rounded-lg">
        Katha
      </span>
      <span className="uppercase font-medium">Corner</span>
    </Link>
  );
};

export default Logo;
