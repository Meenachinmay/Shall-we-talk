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
  Button,
  Input,
  Progress,
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
import { useRecoilState } from "recoil";
import { currentUserState } from "../../atoms/currentUserState";
import { firestore, storage } from "../firebase/clientApp";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import "../homepage.css";

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
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [updating, setUpdating] = useState(false);
  const [bytesCount, setBytesCount] = useState<number>(0);
  const [uploadingImage, setUploadingImage] = useState<Boolean>(false);
  const toast = useToast();
  const { id } = useParams();
  const profileCol = collection(firestore, "userProfiles");
  const [file, setFile] = useState<File | null>(null);

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
  });

  const handleEditProfileImage = async () => {
    try {
      if (!file) {
        alert("Image upload error, Please select a picture to upload.");
        return;
      }

      const storageRef = ref(storage, `userProfileImage-${file.name}`);
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
          });
        }
      );
    } catch (error) {
      console.log("There is an error to update the profile image now.");
    }
  };

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
      });
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

  useEffect(() => {
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
        });
      });
    });

    return () => unsub();
  }, [firestore]);
 
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
                    <Button size={"xs"} onClick={handleEditProfileImage}>
                      アップロード
                    </Button>
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
                  >
                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="name"
                        placeholder="お名前"
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
                    </HStack>
                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="email"
                        placeholder="メールアドレス"
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
                    </HStack>
                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="companyName"
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="所属（会社名・部署名等）"
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
                    </HStack>
                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="companyProfile"
                        onChange={(e) => setCompanyProfile(e.target.value)}
                        placeholder="職業プロフィール"
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
                    </HStack>
                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="workProfile"
                        onChange={(e) => setworkProfile(e.target.value)}
                        placeholder="職業プロフィール"
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
                    </HStack>
                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="hobbies"
                        onChange={(e) => setHobbies(e.target.value)}
                        placeholder="趣味"
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
                    </HStack>
                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="pet"
                        onChange={(e) => setPet(e.target.value)}
                        placeholder="飼っているペットまたは好きなものについて"
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
                    </HStack>

                    <HStack w="full" mt={3} justifyContent="start">
                      <Input
                        name="pr"
                        onChange={(e) => setPr(e.target.value)}
                        placeholder="自己紹介文"
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
                    </HStack>
                    <Button
                      mt={5}
                      isLoading={updating}
                      loadingText={"Updating..."}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "red.500",
                        color: "red.500",
                      }}
                      onClick={handleUpdateProfile}
                      fontSize="10pt"
                      fontWeight={700}
                      bg="red.500"
                      color="white"
                      variant="solid"
                      height="36px"
                      width={{ base: "80%", lg: "100%" }}
                      className="my__button"
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
