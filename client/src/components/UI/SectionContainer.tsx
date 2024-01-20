import React from "react";

interface sectionContainerProps {
  className?: String;
  children: React.ReactNode;
}

const SectionContainer = ({
  className = "",
  children,
}: sectionContainerProps) => {
  return <section className={`${className}`}>{children}</section>;
};

export default SectionContainer;
