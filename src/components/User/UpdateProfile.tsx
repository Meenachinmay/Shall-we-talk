import {
  Flex,
  HStack,
  VStack,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Container,
  Input,
  Divider,
  Avatar,
  Button,
  Progress,
  Textarea,
  Text,
  Stack,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  onSnapshot,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore, storage } from "../firebase/clientApp";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import "../homepage.css";
import { useRecoilState } from "recoil";
import { currentUserProfileState } from "../../atoms/currentUserProfileState";
import { currentUserState } from "../../atoms/currentUserState";

import { isMobile } from "react-device-detect";

const UpdateProfile: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyProfile, setCompanyProfile] = useState("");
  const [workProfile, setworkProfile] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [pet, setPet] = useState("");
  const [pr, setPr] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [bytesCount, setBytesCount] = useState<number>(0);
  const [uploadingImage, setUploadingImage] = useState<Boolean>(false);
  const toast = useToast();
  const { id } = useParams();
  const profileCol = collection(firestore, "userProfiles");
  const [file, setFile] = useState<File | null>(null);
  const [mobile, setMobile] = useState<boolean>(false);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const [currentUserSt, setCurrentUserSt] = useRecoilState(currentUserState);

  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    companyName: string;
    companyProfile: string;
    workProfile: string;
    hobbies: string;
    pet: string;
    pr: string;
    profileImage: string;
    spaceId: string;
  }>({
    name: "",
    email: "",
    companyProfile: "",
    companyName: "",
    workProfile: "",
    hobbies: "",
    pr: "",
    pet: "",
    profileImage: "",
    spaceId: "",
  });

  // store data for setting vs-user collection while updating the user profile
  // because vs-users access data from user profile also

  // method to handle user profile image udpate operations
  const handleEditProfileImage = async () => {
    try {
      if (!file) {
        alert("Image upload error, Please select a picture to upload.");
        return;
      }

      const storageRef = ref(
        storage,
        `user-profile-images/userProfileImage-${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      setUploadingImage(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setBytesCount(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused.");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfileImage(downloadURL);
            setUploadingImage(false);
            setFile(null);
          });
        }
      );
    } catch (error) {
      console.log("There is an error to update the profile image now.");
    }
  };

  // method to handle update operations
  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      await setDoc(doc(firestore, `userProfiles/userProfileId-${id}`), {
        name: userName || userProfile.name,
        email: email || userProfile.email,
        companyName: companyName || userProfile.companyName,
        companyProfile: companyProfile || userProfile.companyProfile,
        workProfile: workProfile || userProfile.workProfile,
        hobbies: hobbies || userProfile.hobbies,
        pet: pet || userProfile.pet,
        pr: pr || userProfile.pr,
        profileImage: profileImage || userProfile.profileImage,
        userId: id,
        spaceId: userProfile.spaceId,
      });

      // here update the user in vs-users collection also
      await setDoc(doc(firestore, `vs-users/userId-${id}`), {
        companyName: companyName || userProfile.companyName,
        id: id,
        spaceId: userProfile.spaceId,
        name: userName || userProfile.name,
        online: true,
        status: currentUserSt.status,
        userPosX: currentUserSt.userPosX,
        userPosY: currentUserSt.userPosY,
        profileImage: profileImage || userProfile.profileImage,
        mobileUser: mobile ? true : false,
      });

      // updating global state here for current user profile
      setCurrentUserProfileState((prev) => ({
        ...prev,
        name: userName || userProfile.name,
      }));

      setUpdating(false);
      setProfileImage("");

      toast({
        title: "Profile updated",
        description: "Your profile updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // updating user profile image
  useEffect(() => {
    if (!file) {
      return;
    }

    handleEditProfileImage();

    return () => {
      setFile(null);
    };
  }, [file]);

  // fetching profile for a user
  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    }

    const profileQuery = query(
      profileCol,
      where("userId", "==", `${id}`),
      limit(1)
    );

    const unsub = onSnapshot(profileQuery, (snapShot) => {
      snapShot.forEach((doc) => {
        setUserProfile({
          name: doc.data().name,
          email: doc.data().email,
          companyProfile: doc.data().companyProfile,
          companyName: doc.data().companyName,
          hobbies: doc.data().hobbies,
          pr: doc.data().pr,
          pet: doc.data().pet,
          workProfile: doc.data().workProfile,
          profileImage: doc.data().profileImage,
          spaceId: doc.data().spaceId,
        });
      });
    });

    return () => unsub();
  }, [firestore, profileCol]);

  return (
    <VStack h="full" spacing={0} justifyContent="start">
      <Container maxW="3xl">
        <HStack w="full" maxW="2xl" spacing={6} alignItems="center">
          <Flex
            flexDirection="column"
            alignItems="center"
            py={6}
            w="full"
            maxW="2xl"
          >
            <Box p={6} w="full" h="full" overflow="auto">
              <Stat mt={6}>
                <StatLabel color="gray.500">Updating Profile of</StatLabel>
                <StatNumber>{userProfile.name}</StatNumber>
              </Stat>
              <Box w="full">
                <Divider color="gray.100" />
              </Box>
              <Flex py={3} flexDirection="column" justifyContent="flex-start">
                <Flex alignItems={"center"}>
                  <Avatar
                    name={userName}
                    size="xl"
                    src={profileImage || userProfile.profileImage}
                  ></Avatar>
                  <div>
                    <label className="image__upload" htmlFor="file">
                      イメージ選択
                    </label>
                    <input
                      onChange={(event) => setFile(event.target.files![0])}
                      accept="image/*"
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                    />
                  </div>
                </Flex>
                <Box w="full" mt={1}>
                  {uploadingImage ? (
                    <Progress
                      width={{ base: "xs", sm: "sm", md: "full" }}
                      value={bytesCount}
                      mt={2}
                    />
                  ) : null}
                  <Flex
                    w="full"
                    h="full"
                    flexDirection={"column"}
                    overflowY="auto"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                      <Stack
                        direction={"column"}
                        w="full"
                        mt={3}
                        justifyContent="center"
                      >
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          Name*
                        </Text>
                        <Input
                          name="name"
                          required
                          maxLength={50}
                          placeholder={userProfile.name}
                          type="text"
                          mb={2}
                          mt={2}
                          onChange={(e) => setUserName(e.target.value)}
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
                      </Stack>
                      <Stack w="full" mt={3} justifyContent="start">
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          Email*
                        </Text>
                        <Input
                          name="email"
                          required
                          maxLength={50}
                          placeholder={userProfile.email}
                          type="email"
                          mb={2}
                          mt={2}
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
                      </Stack>
                      <Stack w="full" mt={3} justifyContent="start">
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          Company Name*
                        </Text>
                        <Input
                          name="companyName"
                          required
                          maxLength={50}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder={userProfile.companyName}
                          type="text"
                          mb={2}
                          mt={2}
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
                      </Stack>
                      <Stack w="full" mt={3} justifyContent="start">
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          Company Profile*
                        </Text>
                        <Input
                          name="companyProfile"
                          required
                          maxLength={100}
                          onChange={(e) => setCompanyProfile(e.target.value)}
                          placeholder={userProfile.companyProfile}
                          type="text"
                          mb={2}
                          mt={2}
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
                      </Stack>
                      <Stack w="full" mt={3} justifyContent="start">
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          Work Profile*
                        </Text>
                        <Input
                          name="workProfile"
                          required
                          maxLength={50}
                          onChange={(e) => setworkProfile(e.target.value)}
                          placeholder={userProfile.workProfile}
                          type="text"
                          mb={2}
                          mt={2}
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
                      </Stack>
                      <Stack w="full" mt={3} justifyContent="start">
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          Hobbies*
                        </Text>
                        <Input
                          name="hobbies"
                          required
                          maxLength={50}
                          onChange={(e) => setHobbies(e.target.value)}
                          placeholder={userProfile.hobbies}
                          type="text"
                          mb={2}
                          mt={2}
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
                      </Stack>
                      <Stack w="full" mt={3} justifyContent="start">
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          Pet*
                        </Text>
                        <Input
                          name="pet"
                          required
                          maxLength={50}
                          onChange={(e) => setPet(e.target.value)}
                          placeholder={userProfile.pet}
                          type="text"
                          mb={2}
                          mt={2}
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
                      </Stack>
                      <Flex
                        flexDirection="column"
                        w="full"
                        mt={3}
                        justifyContent="start"
                      >
                        <Text
                          fontSize={"xs"}
                          color="red.600"
                          fontWeight={"bold"}
                        >
                          PR*
                        </Text>
                        <Textarea
                          resize={"vertical"}
                          required
                          maxLength={200}
                          name="pr"
                          onChange={(e) => setPr(e.target.value)}
                          placeholder={userProfile.pr}
                          mb={2}
                          mt={2}
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
                      <Button
                        mt={5}
                        isLoading={updating}
                        loadingText={"アップデート中"}
                        _hover={{
                          bg: "white",
                          border: "1px solid",
                          borderColor: "red.500",
                          color: "red.500",
                        }}
                        fontSize="10pt"
                        fontWeight={700}
                        bg="red.500"
                        color="white"
                        variant="solid"
                        height="36px"
                        width={{ base: "80%", lg: "100%" }}
                        className="my__button"
                        onClick={handleUpdateProfile}
                      >
                        実行
                      </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </HStack>
      </Container>
    </VStack>
  );
};

export default UpdateProfile;
