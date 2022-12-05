import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { HiBell } from "react-icons/hi";
import NotificationsDrawer from "./Drawers/NotificationsDrawer";
import RightContent from "./Navbar/RightContent/RightContent";
import SearchInput from "./SearchInput";
import Logo from "../images/logo_bgTransparent.png";

const Navbar: React.FC = () => {
  return (
    <Flex
      bg="white"
      height="100px"
      shadow="md"
      padding="24px 12px"
      alignItems="center"
    >
      <Image mr={5} src={Logo} alt="user logo" boxSize="80px" />
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

export default Navbar;
