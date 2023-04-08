import React from "react";
import { Flex, Text, Stack, Image, Button } from "@chakra-ui/react";

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
          direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={{ base: "90%", md: "80%", lg: "80%"}}
          height={{ base: "700px", sm: "700px", md: "700px", lg: "700px" }}
          borderRadius="20px"
          padding={"25px"}
          border="1px solid"
          borderColor={"gray.200"}
          bg="red.50"
          overflow={"scroll"}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            padding={"20px"}
            width={{ base: "full", sm: "full", md: "40%", lg: "40%" }}
          >
            <Flex
              flexDirection={"column"}
              gap={10}
              alignItems={"center"}
              justifyContent={"center"}
              width="full"
            >
              <Image
                rounded={"full"}
                border="5px solid"
                borderColor={'blue.500'}
                h={{ base: "200px", sm: "250px", md: "full", lg: "300px" }}
                w={{ base: "200px", sm: "250px", md: "full", lg: "300px" }}
                src="https://avatars.githubusercontent.com/u/16211217?v=4"
                alt="User profile picutre"
              />
              <Button
                size={"sm"}
                rounded="full"
                variant={"outline"}
                bg="red.500"
                color="white"
                _hover={{
                  bg: "white",
                  color: "red.500",
                  borderColor: "red.500",
                }}
                fontSize="xs"
              >
                update profile image
              </Button>
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
            </Flex>
          </Flex>
          <Flex
            padding={"20px"}
            alignItems="start"
            justifyContent="start"
            width={{ base: "full", sm: "full", md: "60%", lg: "60%"}}
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
                <Text fontSize={{base: "2xl", md: "3xl"}} fontWeight="bold" color="gray.800">
                  Chinmay anand
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={{ base: "md", md: "xl", lg: "xl"}} fontWeight="bold">
                  所属名:
                </Text>
                <Text fontSize={{ base: "sm", md: "md", lg: "md"}} fontWeight="light" color="gray.600">
                  RCI
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={{ base: "md", md: "xl", lg: "xl"}} fontWeight="bold">
                  所属組織の紹介:
                </Text>
                <Text fontSize={{ base: "sm", md: "md", lg: "md"}} fontWeight="light" color="gray.600">
                  IT
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={{ base: "md", md: "xl", lg: "xl"}} fontWeight="bold">
                  職業プロフィール:
                </Text>
                <Text
                  width={"full"}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
                  fontWeight="light"
                  color="gray.600"
                >
                  Senior developer
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={{ base: "md", md: "xl", lg: "xl"}} fontWeight="bold">
                  趣味:
                </Text>
                <Text
                  width={"full"}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
                  fontWeight="light"
                  color="gray.600"
                >
                  Reading, cooking
                </Text>
              </Stack>
              <Stack spacing={0} alignItems={"start"}>
                <Text fontSize={{ base: "md", md: "xl", lg: "xl"}} fontWeight="bold">
                  飼っているペット:
                </Text>
                <Text
                  width={"full"}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
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
                <Text fontSize={{ base: "md", md: "xl", lg: "xl"}} fontWeight="bold">
                  自己紹介文:
                </Text>
                <Text
                  width={"full"}
                  fontSize={{ base: "sm", md: "md", lg: "md"}}
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
