
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { InformationFormSchema, InformationFormSchemaType } from "../types/schema";
import { useGetCurrentProfileQuery, useUpdateCurrentProfileMutation } from "@/features/profile-settings/api/profileSettings.api";

export const useInformationForm = () => {
  const [signup, { isLoading }] = useUpdateCurrentProfileMutation();
  const { data } = useGetCurrentProfileQuery();

  console.log(data)

  const [notification, setNotification] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    reset,
    formState: { errors },
  } = useForm<InformationFormSchemaType>({
    resolver: zodResolver(InformationFormSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (data) {
      reset({
        username: data.userName || "",
        lastName: data.lastName || "",
        firstName: data.firstName || "",
        aboutMe: data.aboutMe || "",
        dateBirth: data.dateOfBirth || "",
      });
    }
  }, [data, reset]);

  const signupHandler: SubmitHandler<InformationFormSchemaType> = async (
    data
  ) => {
    try {
      await signup({
        userName: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateBirth,
        country: data.selectYourCountry,
        city: data.selectYourCity,
        aboutMe: data.aboutMe,
      })
        .unwrap()
        .then(() => {
          setNotification({
            isOpen: true,
            message: "Your settings are saved!",
          });
        });
    } catch (error) {
      setNotification({
        isOpen: true,
        message: "Error! Server is not available!",
      });
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      });
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    notification,
    trigger,
    signupHandler,
    setNotification,
    isLoading
  };
};
