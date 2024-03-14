import { Grid } from "@chakra-ui/react";
import RoomSkeleton from "../components/RoomSkeleton";
import Room from "../components/Room";
import { getRooms } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IRoomList } from "../types";
import { useEffect } from "react";

export default function Home() {
  const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {data?.map((room, idx) => (
        <Room
          key={room.pk}
          pk={room.pk}
          isOwner={room.is_owner}
          // imageUrl={`https://source.unsplash.com/random/450x${450 + idx}`}
          imageUrl={
            room.photos[0]?.file
              ? room.photos[0].file
              : "https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg"
          }
          name={room.name}
          rating={room.rating}
          city={room.city}
          country={room.country}
          price={room.price}
        />
      ))}
    </Grid>
  );
}
