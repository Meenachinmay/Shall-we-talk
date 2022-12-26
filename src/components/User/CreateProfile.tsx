import {
  Flex,
  HStack,
  VStack,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Container,
  Divider,
  Avatar,
  AvatarBadge,
  Button,
  Input,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState } from "../../atoms/currentUserState";
import { firestore } from "../../firebase/clientApp";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../homepage.css";
import { currentUserProfileState } from "../../atoms/currentUserProfileState";

const CreateProfile: React.FC = () => {
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyProfile, setCompanyProfile] = useState("");
  const [workProfile, setworkProfile] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [pet, setPet] = useState("");
  const [pr, setPr] = useState("");
  const [profileImage, setProfileImage] = useState<String | null>(null);
  const [currentUser] = useRecoilState(currentUserState);
  const setCurrentProfile = useSetRecoilState(currentUserProfileState)
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreateProfile = async () => {
    try {

      if (!profileImage) {
        setProfileImage('https://i.pravatar.cc/40')
      }

      setLoading(true);

      await setDoc(
        doc(firestore, `userProfiles/userProfileId-${currentUser.id}`),
        {
          name: owner,
          email: currentUser.email,
          companyName: companyName,
          companyProfile: companyProfile,
          workProfile: workProfile,
          hobbies: hobbies,
          pet: pet,
          pr: pr,
          profileImage: profileImage,
          userId: currentUser.id,
        }
      );

      setLoading(false);
      setProfileImage(null)

      toast({
        title: "Profile created",
        description: "Your profile created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      setCurrentProfile((prev) => ({
        ...prev,
        name: owner
      }))

      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack h="full" spacing={0} justifyContent="start">
      <Container maxW="2xl">
        <Flex
          flexDirection="column"
          alignItems="center"
          py={6}
          w="full"
          maxW="2xl"
        >
          <Box p={6} w="full" h="full" overflow="auto">
            <Stat mt={6}>
              <StatLabel color="gray.500">Creating Profile of</StatLabel>
              <StatNumber>{owner}</StatNumber>
            </Stat>
            <Box w="full">
              <Divider color="gray.100" />
            </Box>
            <Flex py={3} flexDirection="column" justifyContent="flex-start">
              <Avatar
                name="Chinmay anand"
                onClick={() => alert("hello world")}
                size="xl"
                src="https://cdn-icons-png.flaticon.com/512/6426/6426232.png"
              >
                <AvatarBadge bg="green.500" boxSize={6} borderWidth={4} />
              </Avatar>
              <Box w="full" mt={1}>
                <VStack w="full" h="full" spacing={4} overflowY="auto">
                  <HStack w="full" mt={6} justifyContent="start">
                    <Input
                      name="name"
                      placeholder="Please tell us your name."
                      type="text"
                      mb={2}
                      mt={2}
                      onChange={(e) => setOwner(e.target.value)}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </HStack>
                  <HStack w="full" mt={6} justifyContent="start">
                    <Input
                      name="email"
                      placeholder="Email"
                      type="email"
                      mb={2}
                      mt={2}
                      value={currentUser.email}
                      onChange={(e) => setEmail(e.target.value)}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </HStack>
                  <HStack w="full" mt={6} justifyContent="start">
                    <Input
                      name="companyName"
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="What is your company name?"
                      type="text"
                      mb={2}
                      mt={2}
                      value={companyName}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </HStack>
                  <HStack w="full" mt={6} justifyContent="start">
                    <Input
                      name="companyProfile"
                      onChange={(e) => setCompanyProfile(e.target.value)}
                      placeholder="What is your company profile?"
                      type="text"
                      mb={2}
                      mt={2}
                      value={companyProfile}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </HStack>
                  <HStack w="full" mt={6} justifyContent="start">
                    <Input
                      name="workProfile"
                      onChange={(e) => setworkProfile(e.target.value)}
                      placeholder="What is your work profile."
                      type="text"
                      mb={2}
                      mt={2}
                      value={workProfile}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </HStack>
                  <HStack w="full" mt={6} justifyContent="start">
                    <Input
                      name="hobbies"
                      onChange={(e) => setHobbies(e.target.value)}
                      placeholder="Tell us your hobbies."
                      type="text"
                      mb={2}
                      mt={2}
                      value={hobbies}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </HStack>
                  <HStack w="full" mt={6} justifyContent="start">
                    <Input
                      name="pet"
                      onChange={(e) => setPet(e.target.value)}
                      placeholder="Write about your pet."
                      type="text"
                      mb={2}
                      mt={2}
                      value={pet}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </HStack>

                  <Flex flexDirection="column" w="full" mt={6}>
                    <Input
                      name="pr"
                      onChange={(e) => setPr(e.target.value)}
                      placeholder="Write few words about yourself."
                      type="text"
                      mb={2}
                      mt={2}
                      value={pr}
                      fontSize="10pt"
                      _placeholder={{ color: "gray.500" }}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      _focus={{
                        outline: "none",
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                      }}
                      bg="gray.50"
                    />
                  </Flex>
                </VStack>
                <HStack justifyContent="space-between" mt={4} w="sm">
                  <Button
                    isLoading={loading}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "red.500",
                      color: "red.500",
                    }}
                    onClick={handleCreateProfile}
                    fontSize="10pt"
                    fontWeight={700}
                    bg="red.500"
                    color="white"
                    variant="solid"
                    height="36px"
                    width="100%"
                    className="my__button"
                  >
                    Create profile
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </VStack>
  );
};

export default CreateProfile;
