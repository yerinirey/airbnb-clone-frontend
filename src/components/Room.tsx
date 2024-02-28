import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa6";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
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
        <Image h="280px" w="100%" objectFit={"cover"} src={imageUrl} />
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
            {name}
          </Text>
          <HStack spacing={1} alignItems={"center"}>
            <FaStar size={14} />
            <Text>{rating}</Text>
          </HStack>
        </Grid>
      </Box>
      <Text fontSize={"sm"} color={gray}>
        {city}, {country}
      </Text>
      <Text fontSize={"sm"} color={gray}>
        <Text as="b">${price} / night</Text>
      </Text>
    </VStack>
  );
}
