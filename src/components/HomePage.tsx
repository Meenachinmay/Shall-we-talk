import { Box, Image, VStack, Text, Flex } from "@chakra-ui/react";
import React from "react";
import "../components/homepage.css";
import Landing from '../images/landingpagenew.png'
import Parrot from '../images/parrot.png'

const HomePage: React.FC = () => {
  return (
    <VStack alignItems={"center"} style={{ width: "100%", height: "100%"}}>

        <div className="landingpage__text">
          <p className="landingpage__first__text">Shall We Talk はオフィス内の</p>
          <p className="landingpage__center__text">『直接会話』</p>
          <p className="landingpage__end__text">を後押しするサービスです。</p>
        </div>  
     
      <Box width={{ base: 'xs', md: 'md', lg: 'xl'}} height={{ base: 'md', md: 'lg', lg: '100vh'}} >
        <Image src={Parrot} objectFit="cover"/>
      </Box>
    </VStack>
  );
};

export default HomePage;
