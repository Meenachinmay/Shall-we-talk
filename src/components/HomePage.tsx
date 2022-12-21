import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import "../components/homepage.css";

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
        fontSize="xl"
      >
        Hello form SWT ✅, 自分のコワーキングスペースでご存知のない方にご遠慮なく話しかけるアプリをご紹介させていただいております。
      </Text>
    </VStack>
  );
};

export default HomePage;
