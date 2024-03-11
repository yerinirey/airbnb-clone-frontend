import { Heading, Spinner, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api";
import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const code = params.get("code");
  const mutation = useMutation(kakaoLogin, {
    onMutate: () => {
      console.log("Kakao Logging in...");
    },
    onSuccess: () => {
      toast({
        status: "success",
        title: "Welcome!",
        description: "Happy to have you back!",
        position: "bottom-right",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    onError: (error) => {
      toast({
        status: "error",
        title: "Failed",
        description: "Something went wrong.. Please check your account.",
        position: "bottom-right",
      });
      navigate("/");
    },
  });

  useEffect(() => {
    if (code) mutation.mutate({ code });
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading mb={5}>Processing log in . . .</Heading>
      {/* <Text>plz wait</Text> */}
      <Spinner size="lg" />
    </VStack>
  );
}
