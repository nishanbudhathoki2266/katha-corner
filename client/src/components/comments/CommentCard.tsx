"use client";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

// Just taking comments for now! will comeback to it later
interface CommentCardProps {
  comment: string;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card className="bg-transparent border-none shadow-lg">
      <CardHeader className="flex gap-3 cursor-pointer">
        <Image
          alt="nextui logo"
          height={40}
          radius="full"
          src="https://i.pinimg.com/564x/2d/bc/8a/2dbc8a860119e0a6409ff06a7cbec5b1.jpg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Ram Bahadur</p>
          <p className="text-small text-default-500">ram@hotmail.com</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{comment}</p>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default CommentCard;
