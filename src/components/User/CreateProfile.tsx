import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex, Input,
  Progress, Stack, Stat,
  StatLabel,
  StatNumber, Text, Textarea,
  useToast,
  VStack
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserProfileState } from "../../atoms/currentUserProfileState";
import { currentUserState } from "../../atoms/currentUserState";
import { generateRandomPositions } from "../../utilservices/ExternalMethods";
import { firestore, storage } from "../firebase/clientApp";
import "../homepage.css";

const CreateProfile: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyProfile, setCompanyProfile] = useState("");
  const [workProfile, setworkProfile] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [pet, setPet] = useState("");
  const [pr, setPr] = useState("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [currentUser] = useRecoilState(currentUserState);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setuploadingImage] = useState<Boolean>(false);
  const [bytesCount, setBytesCount] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [mobile, setMobile] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { email, accessKey } = useParams();

  const setCurrentUserProfileState = useSetRecoilState(currentUserProfileState);

  function putImage() {
    if (profileImage === "") {
      return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    } else {
      return profileImage;
    }
  }

  const handleCreateProfile = async () => {
    try {
      setLoading(true);
      // Here creating user profile
      await setDoc(
        doc(firestore, `userProfiles/userProfileId-${currentUser.id}`),
        {
          name: userName,
          email: currentUser.email,
          companyName: companyName,
          companyProfile: companyProfile,
          workProfile: workProfile,
          hobbies: hobbies,
          pet: pet,
          pr: pr,
          profileImage: putImage(),
          userId: currentUser.id,
          accessKey: accessKey,
          spaceId: window.atob(email!),
        }
      );

      // setting up current user profile in global state
      setCurrentUserProfileState((prev) => ({
        ...prev,
        id: currentUser.id,
        name: userName,
        accessKey: accessKey,
        spaceId: window.atob(email!),
        companyName: companyName,
        companyProfile: companyProfile,
        profileImage: profileImage,
        pet: pet,
        pr: pr,
        status: currentUser.status,
        hobbies: hobbies,
        workProfile: workProfile,
      }));

      // here add user in vs-user's collection
      try {
        await setDoc(doc(firestore, `vs-users/userId-${currentUser.id}`), {
          companyName: companyName,
          id: currentUser.id,
          name: userName,
          accessKey: accessKey,
          spaceId: window.atob(email!),
          online: true,
          status: "do_not_want_to_talk",
          userPosX: generateRandomPositions(100, 500).x,
          userPosY: generateRandomPositions(100, 500).y,
          profileImage: putImage(),
          mobileUser: mobile ? true : false,
        });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
      setProfileImage("");
      toast({
        title: "プロフィールの作成に成功しました",
        description: "SWTでの体験をお楽しみください",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(`/dashboard/${email}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProfileImage = async () => {
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
      setuploadingImage(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setBytesCount(progress);
          console.log("Upload is " + progress + "% done");
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
            setuploadingImage(false);
          });
        }
      );
    } catch (error) {
      console.log("There is an error to update the profile image now.");
    }
  };

  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    }

    if (!file) {
      return;
    }

    handleCreateProfileImage();

    return () => {
      setFile(null);
    };
  }, [file]);

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
              <StatNumber>{userName}</StatNumber>
            </Stat>
            <Box w="full">
              <Divider color="gray.100" />
            </Box>
            <Flex py={3} flexDirection="column" justifyContent="flex-start">
              <Flex alignItems={"center"}>
                <Avatar name={userName} size="xl" src={profileImage}></Avatar>
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
                {uploadingImage ? <Progress value={bytesCount} mt={2} /> : null}
                <Stack
                  w="full"
                  h="full"
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={4}
                  overflowY="scroll"
                >
                    <Stack
                      w="full"
                      direction={"column"}
                      mt={6}
                      justifyContent="start"
                    >
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Name*
                      </Text>
                      <Input
                        name="name"
                        required
                        maxLength={50}
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
                    </Stack>
                    <Stack
                      w="full"
                      direction={"column"}
                      mt={6}
                      justifyContent="start"
                    >
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Email*
                      </Text>
                      <Input
                        name="email"
                        required
                        maxLength={50}
                        placeholder="メールアドレス"
                        type="email"
                        mb={2}
                        mt={2}
                        value={currentUser.email}
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
                    <Stack
                      w="full"
                      mt={6}
                      direction={"column"}
                      justifyContent="start"
                    >
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Company Name*
                      </Text>
                      <Input
                        name="companyName"
                        required
                        maxLength={50}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="所属（会社名・部署名等）"
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
                    </Stack>
                    <Stack
                      w="full"
                      mt={6}
                      direction={"column"}
                      justifyContent="start"
                    >
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Company Profile*
                      </Text>
                      <Input
                        name="companyProfile"
                        required
                        maxLength={100}
                        onChange={(e) => setCompanyProfile(e.target.value)}
                        placeholder="所属組織の紹介"
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
                    </Stack>
                    <Stack
                      w="full"
                      mt={6}
                      direction={"column"}
                      justifyContent="start"
                    >
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Work Profile*
                      </Text>
                      <Input
                        name="workProfile"
                        required
                        maxLength={50}
                        onChange={(e) => setworkProfile(e.target.value)}
                        placeholder="職業プロフィール"
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
                    </Stack>
                    <Stack w="full" mt={6} justifyContent="start">
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Hobbies*
                      </Text>
                      <Input
                        name="hobbies"
                        required
                        maxLength={50}
                        onChange={(e) => setHobbies(e.target.value)}
                        placeholder="趣味"
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
                    </Stack>
                    <Stack
                      w="full"
                      mt={6}
                      direction={"column"}
                      justifyContent="start"
                      overflowY="scroll"
                    >
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Pet*
                      </Text>
                      <Input
                        name="pet"
                        required
                        maxLength={50}
                        onChange={(e) => setPet(e.target.value)}
                        placeholder="飼っているペットまたは好きなものについて"
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
                        textOverflow="clip"
                      />
                    </Stack>

                    <Flex flexDirection="column" w="full" mt={6}>
                      <Text fontSize={"xs"} color="red.600" fontWeight={"bold"}>
                        Pr*
                      </Text>
                      <Textarea
                        resize={"vertical"}
                        required
                        maxLength={200}
                        name="pr"
                        onChange={(e) => setPr(e.target.value)}
                        placeholder="自己紹介文"
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
                    <Button
                      isLoading={loading}
                      loadingText={"作成中"}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "red.500",
                        color: "red.500",
                      }}
                      fontSize="10pt"
                      fontWeight={700}
                      onClick={handleCreateProfile}
                      bg="red.500"
                      color="white"
                      variant="solid"
                      height="36px"
                      width="100%"
                      className="my__button"
                    >
                      プロフィール作成
                    </Button>
                </Stack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </VStack>
  );
};

export default CreateProfile;
