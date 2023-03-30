import React from "react";
import { Text, Flex, Link, Image } from "@chakra-ui/react";
import FourZeroFour from "../images/404.svg";

const PageNotFound: React.FC = () => {
  return (
    <div>
      <Flex
        height={"100vh"}
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Image src={FourZeroFour} width="fit-content" height={"fit-content"} />
        <Text fontSize="md" color="gray.700">
          <Link href="/" style={{ textDecoration: "none"}}>
            <Text fontSize={'xl'} fontWeight='bold' color="red.500">ホームページへ戻ろう</Text>
          </Link>
        </Text>
      </Flex>
    </div>
  );
};

export default PageNotFound;
