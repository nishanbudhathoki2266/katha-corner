import Container from "@/components/UI/Container";
import GridContainer from "@/components/UI/GridContainer";
import Heading from "@/components/UI/Heading";
import SignupForm from "@/components/forms/SignupForm";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import React from "react";

const SignUpPage = () => {
  return (
    <Container className="flex min-h-[90dvh] justify-center items-center">
      <GridContainer className="bg-background overflow-hidden rounded-lg shadow-lg border items-stretch">
        <div className="col-span-full flex flex-col justify-center gap-6 lg:col-span-6 p-4 sm:p-16 lg:p-8 xl:p-24">
          <div className="flex flex-col text-center justify-center items-center gap-2">
            <Heading isPrimary>Create Your Account</Heading>
            <Heading>
              Sign up now to share, connect, and discover with Katha Corner!
            </Heading>
            <Divider className="bg-foreground-300" />
          </div>

          {/* Form */}
          <SignupForm />
        </div>
        <div className="hidden lg:block col-span-6 aspect-square relative">
          <Image
            src="/assets/sign-up.jpg"
            alt="Two girls (friends) being happy together"
            fill
            objectFit="cover"
          />
        </div>
      </GridContainer>
    </Container>
  );
};

export default SignUpPage;
