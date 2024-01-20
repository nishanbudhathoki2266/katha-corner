import React from "react";

interface sectionContainerProps {
  className: string;
  children: React.ReactNode;
}

const SectionContainer = ({
  className = "",
  children,
}: sectionContainerProps) => {
  return <section className={className}>{children}</section>;
};

export default SectionContainer;
