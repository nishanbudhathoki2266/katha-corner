"use client";

import React, { useState } from "react";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { createPost } from "@/app/actions/posts";
import { getToken } from "@/redux/reducerSlices/user";
import { IoImageOutline, IoLocationOutline } from "react-icons/io5";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

interface FormValues {
  description?: string;
  location: string;
}

const PostCreateForm = () => {
  const token = useSelector(getToken);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isPublishing, setIsPublishing] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (formData: FormValues) => {
    const { description, location } = formData;
    if (!token || !description) return;

    setIsPublishing(true);
    const res = await createPost(token, {
      description,
      location,
    });

    setIsPublishing(false);
    if (res.status === "success") {
      reset();

      toast.success("Post published successfully!");
    } else {
      res.message && toast.error(res.message);
    }
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      {/* Description or Caption */}
      <Controller
        control={control}
        name="description"
        rules={{
          minLength: {
            value: 10,
            message: "Description must have at least 10 characters!",
          },
          maxLength: {
            value: 500,
            message: "Only 500 or less characters allowed!",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Textarea
            value={value || ""}
            variant="bordered"
            label="What's on your mind?"
            labelPlacement="inside"
            isInvalid={errors?.description ? true : false}
            errorMessage={errors?.description?.message}
            onChange={onChange}
          />
        )}
      />

      {/* Publish Post button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1">
          {/* Todo make image uploadable while clicking this icon */}
          <IoImageOutline className="text-2xl text-gray-400 cursor-pointer hover:text-gray-500 transition-all ease-in-out duration-300" />
          <>
            <IoLocationOutline
              className="text-2xl text-gray-400 cursor-pointer hover:text-gray-500 transition-all ease-in-out duration-300"
              onClick={onOpen}
            />
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Add a location
                    </ModalHeader>
                    <ModalBody>
                      <Controller
                        control={control}
                        name="location"
                        defaultValue="Somewhere under the sky"
                        rules={{
                          required: {
                            value: true,
                            message: "Location is required!",
                          },
                        }}
                        render={({ field: { value, onChange } }) => (
                          <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                            className="px-2 py-3 rounded-lg border"
                            onPlaceSelected={(place) =>
                              onChange(place?.formatted_address)
                            }
                            defaultValue={value}
                          />
                        )}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="success" onPress={onClose}>
                        Add
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        </div>
        <Button
          type="submit"
          color="success"
          className="text-background"
          isLoading={isPublishing}
          isDisabled={isPublishing}
        >
          Publish post
        </Button>
      </div>
    </form>
  );
};

export default PostCreateForm;
