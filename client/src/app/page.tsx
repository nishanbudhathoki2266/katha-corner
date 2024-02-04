import SectionContainer from "@/components/UI/SectionContainer";
import PostCreateForm from "@/components/posts/PostCreateForm";
import React from "react";

const HomePage = () => {
  return (
    <>
      <SectionContainer className="w-full max-w-4xl">
        <PostCreateForm />
      </SectionContainer>
    </>
  );
};

export default HomePage;
