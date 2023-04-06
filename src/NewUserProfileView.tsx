import React from "react";
import { Flex, Text, Stack, Image, Button, VStack } from "@chakra-ui/react";

const NewUserProfileView: React.FC = () => {
  return (
    <>
      <Flex
        bg={"white"}
        height={"100vh"}
        width={"full"}
        alignItems="center"
        justifyContent="center"
        margin={0}
        padding={0}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          width={"70%"}
          height={"700px"}
          borderRadius="20px"
          padding={"25px"}
          border="1px solid"
          borderColor={"gray.200"}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            padding={"20px"}
            width={"40%"}
          >
            <VStack
              spacing={20}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                rounded={"full"}
                border=".5px solid"
                h="300px"
                w="300px"
                src="https://avatars.githubusercontent.com/u/16211217?v=4"
                alt="User profile picutre"
              />
              <Button
                width={"full"}
                bg="red.500"
                color="white"
                _hover={{
                  bg: "white",
                  color: "red.500",
                  borderColor: "red.500",
                }}
                size={"sm"}
                variant="outline"
              >
                Send message
              </Button>
            </VStack>
          </Flex>
          <Flex
            padding={"20px"}
            alignItems="start"
            justifyContent="start"
            width={"60%"}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="20px"
          >
            <Flex
              gap={"20px"}
              direction={"column"}
              width={"full"}
              height={"full"}
            >
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={"3xl"} fontWeight="bold" color="gray.800">
                  Chinmay anand
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={"xl"} fontWeight="bold">
                  所属名:
                </Text>
                <Text fontSize={"md"} fontWeight="light" color="gray.600">
                  RCI
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={"xl"} fontWeight="bold">
                  所属組織の紹介:
                </Text>
                <Text fontSize={"md"} fontWeight="light" color="gray.600">
                  IT
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={"xl"} fontWeight="bold">
                  職業プロフィール:
                </Text>
                <Text
                  width={"full"}
                  fontSize={"md"}
                  fontWeight="light"
                  color="gray.600"
                >
                  Senior developer
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={"xl"} fontWeight="bold">
                  趣味:
                </Text>
                <Text
                  width={"full"}
                  fontSize={"md"}
                  fontWeight="light"
                  color="gray.600"
                >
                  Reading, cooking
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={"xl"} fontWeight="bold">
                  飼っているペット:
                </Text>
                <Text
                  width={"full"}
                  fontSize={"md"}
                  fontWeight="light"
                  color="gray.600"
                >
                  i have 4 cats.
                </Text>
              </Stack>
              <Stack
                spacing={0}
                alignItems={"start"}
                maxHeight={"150px"}
                overflowY="scroll"
              >
                <Text fontSize={"xl"} fontWeight="bold">
                  自己紹介文:
                </Text>
                <Text
                  width={"full"}
                  fontSize={"md"}
                  fontWeight="light"
                  color="gray.600"
                >
                  I work for RCI as their senior programmar and developer. i
                  will be japan very soon. let's meet you there. I work for RCI
                  as their senior programmar and developer. i will be japan very
                  soon. let's meet you there. I work for RCI as their senior
                  programmar and developer. i will be japan very soon. let's
                  meet you there. I work for RCI as their senior programmar and
                  developer. i will be japan very soon. let's meet you there. I
                  work for RCI as their senior programmar and developer. i will
                  be japan very soon. let's meet you there. I work for RCI as
                  their senior programmar and developer. i will be japan very
                  soon. let's meet you there.
                </Text>
              </Stack>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};

export default NewUserProfileView;
