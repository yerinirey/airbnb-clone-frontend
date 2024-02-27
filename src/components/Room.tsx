import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa6";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"}>
      <Box
        position="relative"
        overflow="hidden"
        mb="3"
        rounded={"3xl"}
        w="100%"
      >
        <Image
          h="280px"
          w="100%"
          objectFit={"cover"}
          src="https://a0.muscache.com/im/pictures/c32d0baa-29be-4313-8448-ff6a95fa59b7.jpg?im_w=720"
        />
        <Button
          variant={"unstyled"}
          position="absolute"
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart size="20px" />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text as="b" noOfLines={1} fontSize="md">
            Doña Remedios Trinidad,필리핀의 저택 전체
          </Text>
          <HStack spacing={1} alignItems={"center"}>
            <FaStar size={14} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
      </Box>
      <Text fontSize={"sm"} color={gray}>
        Seoul, S. Korea
      </Text>
      <Text fontSize={"sm"} color={gray}>
        <Text as="b">$72 / night</Text>
      </Text>
    </VStack>
  );
}
