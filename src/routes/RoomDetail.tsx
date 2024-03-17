import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import type { Value } from "react-calendar/dist/cjs/shared/types";
import Calendar from "react-calendar";
import "../calendar.css";
import "react-calendar/dist/Calendar.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaPenToSquare, FaStar } from "react-icons/fa6";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);
  const [dates, setDates] = useState<Value>();
  const {
    data: checkBookingData,
    isLoading: isCheckingBooking,
    refetch,
  } = useQuery(["check", roomPk, dates], checkBooking, {
    enabled: dates !== undefined,
    cacheTime: 0,
  });

  const onEditClick = () => {
    navigate(`/rooms/${roomPk}/edit`);
  };

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width={"40%"} isLoaded={!isLoading}>
        <HStack justifyContent={"flex-start"}>
          <Heading>{data?.name}</Heading>
          {data?.is_owner ? (
            <Button variant={"unstyled"} onClick={onEditClick}>
              <FaPenToSquare size="30px" color="grey" />
            </Button>
          ) : null}
        </HStack>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={"3"}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((idx) => (
          <GridItem
            colSpan={idx === 0 ? 2 : 1}
            rowSpan={idx === 0 ? 2 : 1}
            overflow={"hidden"}
            key={idx}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {/* {data?.photos && data.photos.length > 0 ? ( */}
              <Image
                w="100%"
                h="100%"
                objectFit={"cover"}
                src={
                  data?.photos[idx]?.file
                    ? data.photos[idx].file
                    : `https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg`
                }
              />
              {/* ) : null} */}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={"2fr 1fr"} maxW="container.lg">
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>·</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          {/* for reviews */}
          <Box mt={10}>
            <Skeleton width="40%" isLoaded={!isLoading}>
              <Heading
                display="flex"
                mb={5}
                fontSize={"2xl"}
                overflow={"visible"}
              >
                <HStack>
                  <FaStar />
                  <Text>{data?.rating}</Text>
                  <Text>·</Text>
                  <Text>
                    {reviewsData?.length} review
                    {reviewsData?.length === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Heading>
            </Skeleton>
            <Container mt={16} maxW={"container.lg"} marginX="none">
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {isReviewsLoading
                  ? [1, 2, 3, 4].map((_, idx) => (
                      <VStack alignItems={"flex-start"} key={idx}>
                        <HStack>
                          <Avatar size="md"></Avatar>
                          <VStack spacing={1} alignItems={"flex-start"}>
                            <Skeleton>
                              <Heading fontSize={"md"}>name loading</Heading>
                            </Skeleton>
                            <Skeleton h={"20px"}>
                              <HStack spacing={1}>
                                <FaStar size="12px" />
                                <Text>star</Text>
                              </HStack>
                            </Skeleton>
                          </VStack>
                        </HStack>
                        <Skeleton width={"100%"} height={"36"}>
                          <Text>review payload</Text>
                        </Skeleton>
                      </VStack>
                    ))
                  : reviewsData?.map((review, idx) => (
                      <VStack alignItems={"flex-start"} key={idx}>
                        <HStack>
                          <Avatar
                            name={review.user.name}
                            src={review.user.avatar}
                            size="md"
                          ></Avatar>
                          <VStack spacing={1} alignItems={"flex-start"}>
                            <Heading fontSize={"md"}>
                              {review.user.name}
                            </Heading>
                            <HStack spacing={1}>
                              <FaStar size="12px" />
                              <Text>{review.rating}</Text>
                            </HStack>
                          </VStack>
                        </HStack>
                        <Text>{review.payload}</Text>
                      </VStack>
                    ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        {/* for calendar */}
        <Box py={10}>
          <Calendar
            goToRangeStartOnSelect
            onChange={setDates}
            selectRange
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            minDetail="month"
            next2Label={null}
            prev2Label={null}
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isCheckingBooking}
            mt={5}
            w="100%"
            colorScheme="red"
          >
            Make Booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color="red.500">Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
