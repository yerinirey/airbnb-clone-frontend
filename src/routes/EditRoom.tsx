import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import {
  IEditRoomVariables,
  IUploadRoomVariables,
  editRoom,
  getAmenities,
  getCategories,
  getRoom,
} from "../api";
import useOwnerOnlyPage from "../components/OwnerOnlyPage";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
interface IForm {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export default function EditRoom() {
  const { roomPk } = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);
  const { register, handleSubmit, watch } = useForm<IUploadRoomVariables>();
  const toast = useToast();

  const mutation = useMutation(editRoom, {
    onSuccess: (data) => {
      toast({
        status: "success",
        position: "bottom-right",
        title: "Updated",
      });
    },
  });
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);

  const onSubmit = (data: IUploadRoomVariables) => {
    if (roomPk) {
      const editedData: IEditRoomVariables = { ...data, roomPk };
      mutation.mutate(editedData);
    }
  };
  let amenityPkList: number[] = [];
  data?.amenities.map((amenity) => {
    amenityPkList.push(amenity.pk);
  });
  useHostOnlyPage();
  useOwnerOnlyPage(roomPk!);
  console.log(watch());
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={"center"}>Edit {data?.name}</Heading>
          <VStack
            spacing={10}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
                defaultValue={data?.name}
              />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
                defaultValue={data?.country}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
                defaultValue={data?.city}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
                defaultValue={data?.address}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  min={0}
                  defaultValue={data?.price}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  type="number"
                  min={0}
                  defaultValue={data?.rooms}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  type="number"
                  min={0}
                  defaultValue={data?.toilets}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description", { required: true })}
                defaultValue={data?.description}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                {...register("pet_friendly", { required: true })}
                defaultChecked={Boolean(data?.pet_friendly)}
              >
                Pet friendly?
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="Choose a kind"
                defaultValue={data?.kind}
              >
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>
                What kind of room are you renting?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a category"
                defaultValue={data?.category.pk}
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                What category describes your room?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      defaultChecked={Boolean(
                        amenityPkList.find((pk) => pk === amenity.pk)
                      )}
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {/* {mutation.isError ? (
              <Text color={"red.500"}>Something went wrong</Text>
            ) : null} */}
            <Button
              type="submit"
              //   isLoading={mutation.isLoading}
              colorScheme="red"
              size="lg"
              w="100%"
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
