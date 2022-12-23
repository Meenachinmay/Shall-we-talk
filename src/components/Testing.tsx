import { Image, Text, VStack, HStack, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import "../components/dashboard.css";
import Floor from '../images/floor.jpg'

const Testing: React.FC = () => {
  const constraintRef = useRef(null);
  return (
    <VStack w={"full"} h="100vh" alignItems="center" p={6}>
      <HStack>
        <HStack
          w="4xl"
          h="full" 
          minH="2xl"
          borderWidth={1}
          borderColor="gray.100"
          bg="red.500"
          overflow="scroll"
        >
          <Image
            src={Floor}
            w="full"
            h="full"
          ></Image>
          <motion.div className="container" ref={constraintRef}>
            <motion.div
              className="user1"
              drag
              dragConstraints={constraintRef}
            ></motion.div>
            <motion.div
              className="user2"
              drag
              dragConstraints={constraintRef}
            ></motion.div>
          </motion.div>
        </HStack>
        <Flex
          flexDirection="column"
          overflowY="auto"
          w="xl"
          p={3}
          height="full"
          maxH="2xl"
          minH="2xl"
          borderWidth={1}
          borderColor="gray.200"
          bg="green.500"
        >
          Hello world 2
        </Flex>
      </HStack>
    </VStack>
  );
};

export default Testing;
