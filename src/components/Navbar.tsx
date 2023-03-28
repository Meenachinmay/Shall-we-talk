import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logoName.svg";
import RightContent from "./Navbar/RightContent/RightContent";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex
      bg="red.50"
      height="60px"
      dropShadow={"md"}
      shadow={"md"}
      padding="24px 12px"
      alignItems="center"
      justifyContent={"space-between"}
      width={"auto"}
    >
      <Image
        onClick={() => navigate("/")}
        cursor={"pointer"}
        mr={3}
        src={Logo}
        alt="user logo"
        height="40px"
      />
      <RightContent />
    </Flex>
  );
};

export default Navbar;
