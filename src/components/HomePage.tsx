import { Box, Image, VStack, Text } from "@chakra-ui/react";
import React from "react";
import "../components/homepage.css";
import Landing from '../images/landingpagenew.png'

const HomePage: React.FC = () => {
  return (
    <VStack alignItems={"center"}>

      <div className="landingpage__text">
        <p className="landingpage__first__text"> Hello form SWT ✅, Shall We Talk はシェアオフィス内の</p>
        <p className="landingpage__center__text">『直接会話』</p>
        <p className="landingpage__end__text">を後押しするサービスです。</p>
      </div> 
      
      <Box width={{ base: 'sm', md: 'lg', lg: '4xl'}} height='lg' >
        <Image src={Landing} objectFit="cover"/>
      </Box>
    </VStack>
  );
};

export default HomePage;
