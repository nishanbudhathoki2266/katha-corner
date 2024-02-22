"use client";

import React from "react";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { MdEdit } from "react-icons/md";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import CommentCard from "../comments/CommentCard";
import { error } from "console";
import { useCreateComment } from "@/hooks/useCreateComment";
import { getToken } from "@/redux/reducerSlices/user";

// Since I'm new to TS, I am rewriting repeated interfaces just to be more familiar with it. Room for improvement in the future! Todo 😉
interface Post {
  _id: string;
  description: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  location: string;
  createdAt: Date;
  updatedAt: Date;
  comments: {
    _id: string;
    user: string;
    post: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

interface PostCardProps {
  post: Post;
  userId?: string;
}

interface CommentFormValues {
  comment: string;
}

const PostCard = ({ post, userId }: PostCardProps) => {
  const [isFollowed, setIsFollowed] = React.useState<Boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const token = useSelector(getToken) || "";

  // use create comment

  const { isPending, mutate } = useCreateComment();

  const { handleSubmit, control, reset } = useForm<CommentFormValues>();

  const onSubmit = async (formData: CommentFormValues) => {
    const { comment } = formData;

    mutate(
      { token, postId: post?._id, comment },
      {
        onSuccess: () => {
          reset();
          onOpen();
        },
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-4">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {post?.user?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {post?.user?.email}
            </h5>
          </div>
        </div>
        {userId && userId === post?._id ? (
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : "text-background"
            }
            color="success"
            radius="sm"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        ) : (
          <Button
            className="text-background"
            color="success"
            radius="sm"
            size="sm"
            variant="solid"
          >
            <MdEdit /> Edit Post
          </Button>
        )}
      </CardHeader>

      <CardBody className="overflow-visible px-3 py-0 text-small text-default-600">
        {/* <time> {post?.createdAt}</time> */}
        <p>{post?.description}</p>
      </CardBody>

      <CardFooter className="gap-3 flex-col items-start">
        <div className="flex flex-row gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4</p>
            <p className=" text-default-400 text-small">likes</p>
          </div>

          {post?.comments?.length ? (
            <div className="flex flex-col gap-2">
              <div onClick={onOpen} className="flex gap-1 cursor-pointer">
                <p className="font-semibold text-default-400 text-small">
                  {post?.comments?.length}
                </p>
                <p className="text-default-400 text-small">
                  {post?.comments?.length === 1 ? "comment" : "comments"}
                </p>
              </div>

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="3xl"
                scrollBehavior={"outside"}
              >
                <ModalContent>
                  {() => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        All comments
                      </ModalHeader>
                      <ModalBody className="w-full">
                        {post?.comments?.map((comment) => (
                          <CommentCard
                            key={comment._id}
                            comment={comment.comment}
                          />
                        ))}
                      </ModalBody>
                      <ModalFooter></ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          ) : (
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">0</p>
              <p className=" text-default-400 text-small">comment</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <Divider />

        {/* Comment form */}
        <form
          className="flex w-full items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Comment field  */}
          <Controller
            control={control}
            name="comment"
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                isRequired
                type="text"
                // @ts-ignore
                size="xs"
                value={value || ""}
                placeholder="Add a comment..."
                variant="bordered"
                isInvalid={invalid}
                onChange={onChange}
              />
            )}
          />

          {/* Sign In Button */}
          <Button type="submit" isLoading={isPending}>
            Post
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
