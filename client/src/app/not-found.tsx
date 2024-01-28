import React from "react";

import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-9xl font-extrabold text-default-400">404</h1>
      <h2 className="text-2xl font-extrabold text-default-400">
        There&apos;s NOTHING here
      </h2>
      <p className="text-sm text-default-400 font-medium">
        Looks like the page you are looking for is not found or never existed!
      </p>
      <Button as={Link} color="default" href="/" variant="bordered">
        Back to Home &rarr;
      </Button>
    </div>
  );
};

export default NotFoundPage;
