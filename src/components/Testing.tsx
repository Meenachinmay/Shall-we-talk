import { Image, Flex } from "@chakra-ui/react";
import React from "react";
import "../components/dashboard.css";
import Floor from "../images/testing_floor.jpg";

const Testing: React.FC = () => {
  return (
    <Flex
      flexDirection={"column"}
      p={3}
      height={"100vh"}
      width="100%"
      bg="white"
    >
      <input
        placeholder="Enter your search here."
        style={{
          border: "1px solid",
          outline: "none",
          width: "full",
          padding: "8px",
          margin: "10px",
        }}
      />
      <Flex p={3}>
        <Flex
          overflowX="scroll"
          mr={2}
          minWidth="900px"
          maxWidth={"900px"}
          height={"700px"}
          bg="green.500"
        >
          <Image src={Floor} style={{ minWidth: "1240px" }}>
          </Image>
        </Flex>
        <Flex width={"600px"} height={"700px"} p={3} bg="blue.500"></Flex>
      </Flex>
    </Flex>
  );
};

export default Testing;
