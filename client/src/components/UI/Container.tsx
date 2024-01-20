import React from "react";

interface containerProps {
  className?: String;
  children: React.ReactNode;
}

const Container = ({ className = "", children }: containerProps) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};

export default Container;
