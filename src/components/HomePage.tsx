import { Text, Box, Image, VStack, Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import "../components/homepage.css";
import Parrot from "../images/parrot.png";
import Layer1 from "../images/layer1.png";
import Layer2 from "../images/layer2.png";
import Layer3 from "../images/layer3.png";
import Layer4 from "../images/layer4.png";

const HomePage: React.FC = () => {

  const [isLargerThan374] = useMediaQuery('(min-width: 374px)')
  const [isLessThan280] = useMediaQuery('(max-width: 280px)')

  return (
    <VStack alignItems={"center"} style={{ width: "100%", height: "100%" }}>
      <Flex
        direction={"column"}
        alignItems="center"
        justifyItems={"center"}
        display={{ base: "none", sm: "inherit" }}
      >
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
        <Flex alignItems={"center"} justifyItems={"center"}>
          <Text
            mt={"30px"}
            bg="#FED7d7"
            color="#E53E3E"
            fontWeight={"bold"}
            fontSize={isLessThan280 ? '7px' : isLargerThan374 ? '7pt' : '10px' }
            p={"10px"}
            borderTopLeftRadius="15px"
            borderBottomLeftRadius={"15px"}
          >
            Shall We Talk はオフィス内の
          </Text>
          <Text
            mt={"30px"}
            bg="#FED7d7"
            color="#2D3748"
            fontWeight={"bold"}
            fontSize={isLessThan280 ? '7px' : isLargerThan374 ? '7pt' : '10px' }
            p={"10px"} 
          >
            『直接会話』
          </Text>
          <Text
            mt={"30px"}
            bg="#FED7d7"
            color="#E53E3E"
            fontWeight={"bold"}
            fontSize={isLessThan280 ? '7px' : isLargerThan374 ? '7pt' : '10px' }
            p={"10px"}
            borderTopRightRadius="15px"
            borderBottomRightRadius={"15px"}
          >
            を後押しするサービスです。
          </Text>
        </Flex>
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
