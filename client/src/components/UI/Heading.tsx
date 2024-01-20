import React from "react";

interface headingProps {
  isPrimary?: boolean;
  className?: String;
  children: React.ReactNode;
}

const Heading = ({ className = "", isPrimary, children }: headingProps) => {
  return (
    <h1
      className={`${
        isPrimary ? "text-5xl font-extrabold" : "text-md font-medium"
      } ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
