import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { SwitchThemeButton } from "./Util/SwitchTheme";
import Link from "next/link";
import * as styles from "../styles/header.module.css";
import { ChevronDownIcon } from "@chakra-ui/icons";
import AppContext from "../context/AppContext";
import { logout } from "../action/user";

const Header = () => {
  const { colorMode } = useColorMode();
  const { user, dispatchUser, dispatchEvents } = useContext(AppContext);
  const handleLogout = async () => {
    try {
      const data = await logout(dispatchUser, dispatchEvents);
      if (data?.error) {
        console.log(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      py={"15px"}
      px={{
        base: "16px",
        md: "48px",
        lg: "64px",
      }}
      gap={"10px"}
    >
      <Link href="/">
        {colorMode === "light" ? (
          <Image
            src="/homepage_logo_2.png"
            width={300}
            height={150}
            alt={"logo"}
          />
        ) : (
          <Image src="/homepage_logo_2.png" width={300} height={150} alt={"logo"} />
        )}
      </Link>
      <Flex alignItems={"center"} gap={"15px"}>
        <SwitchThemeButton />
        {user?.id && <Button onClick={handleLogout}>Log Out</Button>}
      </Flex>
    </Flex>
  );
};

export default Header;
