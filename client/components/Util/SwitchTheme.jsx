import { IconButton } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { useColorMode } from "@chakra-ui/react";

export const SwitchThemeButton = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Switch Theme"
      onClick={toggleColorMode}
      bg={"orange"}
      _hover={{
        bg:"orange",
      }}
      _active={{
        bg:"orange",
      }}
      variant="solid" 
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
    />
  );
};
