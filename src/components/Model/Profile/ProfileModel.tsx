import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Container,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Avatar,
  Divider,
  AvatarBadge,
  HStack,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { profileModelState } from "../../../atoms/userProfileModelState";
import { userProfileState } from "../../../atoms/userProfileState";
import LoadingSpinner from "../../customUIComponents/LoadingSpinner";
import "../../homepage.css";

const ProfileModel: React.FC = () => {
  const [modelState, setModelState] = useRecoilState(profileModelState);
  const [profileState] = useRecoilState(userProfileState);

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false,
      loadingProfileInModel: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modelState.open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center"></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack h="full" spacing={0} justifyContent="start">
              <Container maxW="2xl">
                {modelState.loadingProfileInModel ? (
                  <LoadingSpinner />
                ) : (
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    py={6}
                    w="full"
                    maxW="2xl"
                  >
                    <Box p={6} w="full" h="full" overflow="auto">
                      <Stat mt={6}>
                        <StatLabel color="gray.500">Profile of</StatLabel>
                        <StatNumber>{profileState.name}</StatNumber>
                      </Stat>
                      <Box w="full">
                        <Divider color="gray.100" />
                      </Box>
                      <Flex
                        py={3}
                        flexDirection="column"
                        justifyContent="flex-start"
                      >
                        <Avatar
                          name={`${profileState.name}`}
                          size="xl"
                          src={profileState.profileImage}
                        >
                          <AvatarBadge
                            bg={
                              profileState.status === "want_to_talk"
                                ? `green.500`
                                : profileState.status === "do_not_want_to_talk"
                                ? `red.500`
                                : "blue.500"
                            }
                            boxSize={6}
                            borderWidth={4}
                          ></AvatarBadge>
                        </Avatar>
                        <Box w="full" mt={1}>
                          <VStack
                            w="full"
                            h="full"
                            spacing={4}
                            overflowY="auto"
                          >
                            <HStack w="full" mt={6} justifyContent="start">
                              <Heading size="xs" fontSize="xs">
                                所属名
                              </Heading>
                              <Text color="gray.500" fontSize="xs">
                                {profileState.companyName}
                              </Text>
                            </HStack>
                            <HStack w="full" mt={6} justifyContent="start">
                              <Heading size="xs" fontSize="xs">
                                所属組織の紹介
                              </Heading>
                              <Text color="gray.500" fontSize="xs">
                                {profileState.companyProfile}
                              </Text>
                            </HStack>
                            <HStack w="full" mt={6} justifyContent="start">
                              <Heading size="xs" fontSize="xs">
                                職業プロフィール
                              </Heading>
                              <Text color="gray.500" fontSize="xs">
                                {profileState.workProfile}
                              </Text>
                            </HStack>
                            <Flex flexDirection="column" w="full" maxHeight="150px" mt={6} overflowY="scroll">
                              <Heading mb={2} size="xs" fontSize="xs">
                                自己紹介文
                              </Heading>
                              <Text
                                textOverflow="ellipsis"
                                fontSize="xs"
                                color="gray.500"
                              >
                                {profileState.pr}
                              </Text>
                            </Flex>
                          </VStack>
                          {/* {currentUser.id !== profileState.id ? (
                            <HStack
                              justifyContent="space-between"
                              mt={4}
                              w="sm"
                            >
                              <Button
                                _hover={{
                                  bg: "white",
                                  border: "1px solid",
                                  borderColor: "red.500",
                                  color: "red.500",
                                }}
                                type="submit"
                                fontSize="10pt"
                                fontWeight={700}
                                bg="red.500"
                                color="white"
                                variant="solid"
                                height="36px"
                                width="100%"
                                className="my__button"
                              >
                                メッセージ送信
                              </Button>
                            </HStack>
                          ) : null} */}
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                )}
              </Container>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
