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
import React from "react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  pk,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
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
            onClick={onCameraClick}
          >
            {isOwner ? <FaCamera size="20px" /> : <FaRegHeart size="20px" />}
          </Button>
        </Box>
        <Box w="100%">
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
    </Link>
  );
}
