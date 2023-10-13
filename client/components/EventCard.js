import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, chakra, Flex, Image, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const EventCard = ({ event, page }) => {
  const router = useRouter();
  const {colorMode}  = useColorMode();

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      p={"30px"}
      borderRadius={"10px"}
      border={"4px solid #FF4500"}
      gap={"8px"}
    >
      <Box
        w={"90%"}
        maxW={"200px"}
        bg={'secondaries.900'}
        p={8}
        borderRadius={"50%"}
      >
        <Image
          src={event.logo}
          alt="logo"
        />
      </Box>
      <chakra.h1
        fontWeight={"bold"}
        fontSize={30}
      >
        {event.name}
      </chakra.h1>
      <Button
        rightIcon={<ArrowRightIcon />}
        width={40}
        p={"10px"}
        bg={"#FFA500"}
        boxShadow={"0 9px #999"}
        color={colorMode === "light"?"white":"black"}
        _hover={{
          bg:"FFF500",
          boxShadow:"0 9px #999",
          color: colorMode === "light"?"black":"white"
        }}
        _active={{
          bg:"FF4500",
          boxShadow: "0 5px #666",
          transform: "translateY(4px)",
          transition: "transform 1s boxShadow 0.5s"
        }}
        onClick={()=>router.push(page)}
      >Play</Button>
    </Flex>
  )
}

export default EventCard