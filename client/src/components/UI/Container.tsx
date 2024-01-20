import React from "react";

interface containerProps {
  className: string;
  children: React.ReactNode;
}

const Container = ({ className = "", children }: containerProps) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};

export default Container;
