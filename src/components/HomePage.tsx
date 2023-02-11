import { Box, Image, VStack, Text, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../components/homepage.css";
import Parrot from "../images/parrot.png";
import Layer1 from "../images/layer1.png";
import Layer2 from "../images/layer2.png";
import Layer3 from "../images/layer3.png";
import Layer4 from "../images/layer4.png";

const HomePage: React.FC = () => {
  return (
    <VStack alignItems={"center"} style={{ width: "100%", height: "100%" }}>
      <Flex direction={"column"} alignItems="center" justifyItems={"center"} display={{ base: "none", sm: 'inherit'}}>
        <Box width={{ md: "100%" }} height={"full"}>
          <Image src={Layer1} objectFit={"cover"} />
        </Box>
        <Box width={{ md: "100%" }} height={"full"}>
          <Image src={Layer2} objectFit={"cover"} />
        </Box>
        <Box width={{ md: "100%" }} height={"full"}>
          <Image src={Layer3} objectFit={"cover"} />
        </Box>
        <Box width={{ md: "100%" }} height={"full"}>
          <Image src={Layer4} objectFit={"cover"} />
        </Box>
      </Flex>
      <Flex
        direction={"column"}
        alignItems="center"
        justifyItems={"center"}
        display={{ base: "inherit", sm: "none" }}
      >
        <div className="landingpage__text">
          <p className="landingpage__first__text">
            Shall We Talk はオフィス内の
          </p>
          <p className="landingpage__center__text">『直接会話』</p>
          <p className="landingpage__end__text">を後押しするサービスです。</p>
        </div>
        <Box
          width={{ base: "xs", md: "md", lg: "xl" }}
          height={{ base: "md", md: "lg", lg: "100vh" }}
        >
          <Image src={Parrot} objectFit="cover" />
        </Box>
      </Flex>
    </VStack>
  );
};

export default HomePage;
