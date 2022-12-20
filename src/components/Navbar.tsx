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
import RightContent from "./Navbar/RightContent/RightContent";
import SearchInput from "./SearchInput";
import Logo from "../images/logoName.svg";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {

  const navigate = useNavigate()

  return (
    <Flex
      bg="white"
      height="70px"
      shadow="md"
      padding="24px 12px"
      alignItems="center"
    >
      <Image onClick={() => navigate('/')} cursor={'pointer'}  mr={3} src={Logo} alt="user logo" height="40px" />
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

export default Navbar;
