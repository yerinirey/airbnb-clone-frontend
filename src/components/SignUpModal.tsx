import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser, FaUserTag } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignUp } from "../api";
import { useState } from "react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(userSignUp, {
    onMutate: () => {
      console.log("onMutate");
    },
    onSuccess: () => {
      console.log("Successfully Signed Up");
      toast({
        title: "Signed Upppp!",
        status: "success",
        position: "bottom-right",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data.Failed);
    },
  });
  const onSubmit = ({ ...username }: IForm) => {
    mutation.mutate({ ...username });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUser />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", {
                  required: "Please write a name",
                })}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", {
                  required: "Please write an valid email",
                })}
                type="email"
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserTag />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                variant={"filled"}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color={"red.500"} textAlign={"center"} fontSize="sm">
              {errorMessage}
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme="red"
            w="100%"
          >
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
