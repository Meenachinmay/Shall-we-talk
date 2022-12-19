import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import '../components/homepage.css'

const HomePage: React.FC = () => {
  return (
    <VStack>
      <Text
      className="home__page"
        mt={"5"}
        bg={"red.100"}
        p={"5"}
        borderRadius={"md"}
        color="red.500"
        fontWeight={"semibold"}
        fontSize="2xl"
      >
        Hello form SWT, an app which allows you to talk at your co-working space
        with out hesitation.
      </Text>
    </VStack>
  );
};

export default HomePage;
