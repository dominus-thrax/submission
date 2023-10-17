import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, chakra, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const EventCard = ({ event, page }) => {
  const router = useRouter();
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      p={"30px"}
      borderRadius={"10px"}
      border={"4px solid #075684"}
      gap={"8px"}
    >
      <Box
        w={"90%"}
        maxW={"200px"}
        bg={"secondaries.900"}
        p={8}
        borderRadius={"50%"}
      >
        <Image src={event.logo} alt="logo" />
      </Box>
      <chakra.h1 fontWeight={"bold"} fontSize={30}>
        {event.name}
      </chakra.h1>
      <Button
        rightIcon={<ArrowRightIcon />}
        width={40}
        p={"10px"}
        onClick={() =>
           router.push(page)
           
        }
      >
        Play
      </Button>
    </Flex>
  );
};

export default EventCard;
