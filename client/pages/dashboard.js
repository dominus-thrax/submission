import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import EventCard from "../components/EventCard";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import { masterEvents } from "../model/masterEvents";
import privateUserRoute from "../routers/privateUserRoute";

const Dashboard = () => {
  const { contEvents } = useContext(AppContext);
  const textColor = useColorModeValue("gray.700", "gray.50");
  return (
    <Layout>
      <Flex
        textAlign={"center"}
        pt={10}
        justifyContent={"center"}
        direction={"column"}
        width={"full"}
        pb={"20px"}
      >
        <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
          <chakra.h3
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
          >
            Pulzion Tech or Treat
          </chakra.h3>
          <chakra.h1 py={5} fontSize={48} fontWeight={"bold"} color={textColor}>
            Registered Events
          </chakra.h1>
        </Box>
        {contEvents && contEvents.length === 0 && (
          <Text fontSize={{ base: "2xl", md: "5xl" }} mt={{ base: 10, md: 20 }}>
            {" "}
            You haven&lsquo;t registered for any event
          </Text>
        )}
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          spacing={"8"}
          mt={8}
          px={{
            base: "16px",
            md: "48px",
            lg: "64px",
          }}
        >
          {contEvents.map((event) => {
            console.log("line 68 in dashboard", event, masterEvents);
            const eve = masterEvents.find((eve) => eve.ems_id === event.ems_id);
            return (
              <EventCard
                id={event.id}
                event={event}
                page={eve?.page}
                key={event.id}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
    </Layout>
  );
};

export default privateUserRoute(Dashboard);
