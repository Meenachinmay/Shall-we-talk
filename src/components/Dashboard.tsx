import { Button, Flex, HStack, Input, InputGroup, InputLeftElement, Text, useFormControlStyles, VStack } from "@chakra-ui/react";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import { useRecoilState, useSetRecoilState } from "recoil";
import useImage from "use-image";
import { currentUserProfileState } from "../atoms/currentUserProfileState";
import { currentUserState } from "../atoms/currentUserState";
import { showUserInMapState } from "../atoms/showUserInMapState";
import { profileModelState } from "../atoms/userProfileModelState";
import { userProfileState } from "../atoms/userProfileState";
import { userStatusModelState } from "../atoms/userStatusModelState";
import { firestore } from "./firebase/clientApp";
import { UserData } from "../types/UserData";
import LoadingSpinner from "./customUIComponents/LoadingSpinner";
import ProfileModel from "./Model/Profile/ProfileModel";
import StatusModel from "./Model/Status/StatusModel";
import User from "./User";
import "../components/homepage.css";
import { SearchIcon } from "@chakra-ui/icons";

const Dashboard: React.FC = () => {
  const setProfileModelState = useSetRecoilState(profileModelState);
  const setUserProfileState = useSetRecoilState(userProfileState);
  const setUserStatusModelState = useSetRecoilState(userStatusModelState);
  const [highLightUserInMap, setHighlightUserInMap] = useRecoilState(showUserInMapState);
  const [onlineUsers, setOnlineUsers] = useState<UserData[] | null>([]);
  const [loading, setLoading] = useState(false);
  const onlineUserCol = collection(firestore, "vs-users");
  const profileCol = collection(firestore, "userProfiles");
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const [searchText, setSearchText] = useState("")

  const [bgimage] = useImage(
    "https://149356721.v2.pressablecdn.com/wp-content/uploads/2016/02/Sococo-Virtual-Office.png"
  );

  // this method shows user profile when user wants to see other user's profile by clicking on user card on dashboard page
  const handleShowProfile = (user: UserData) => {
    setProfileModelState((prev) => ({ ...prev, open: true }));

    const profileCol = collection(firestore, "userProfiles");

    const profileQ = query(
      profileCol,
      where("userId", "==", `${user.id}`),
      limit(1)
    );

    setProfileModelState((prev) => ({ ...prev, loadingProfileInModel: true }));

    onSnapshot(profileQ, (snapShot) => {
      snapShot.forEach((doc) => {
        setUserProfileState((prev) => ({
          ...prev,
          name: doc.data().name,
          email: doc.data().email,
          companyName: doc.data().companyName,
          companyProfile: doc.data().companyProfile,
          workProfile: doc.data().workProfile,
          hobbies: doc.data().hobbies,
          pet: doc.data().pet,
          profileImage: doc.data().profileImage,
          pr: doc.data().pr,
        }));
      });
      setProfileModelState((prev) => ({
        ...prev,
        loadingProfileInModel: false,
      }));
    });
  };

  // loading current user profile in global current user profile state
  /*useEffect(() => {
    const profileQuery = query(
      profileCol,
      where("userId", "==", `${currentUser.id}`),
      limit(1)
    );
    const unsub = onSnapshot(profileQuery, (snapShot) => {
      snapShot.forEach((doc) => {
        setCurrentUserProfileState((prev) => ({
          ...prev,
          name: doc.data().name,
        }));
      });
    });
    return () => {
      unsub();
    };
  }, [firestore, currentUser.id]);*/

  // this use effect to load all the logged in users from the database
  useEffect(() => {
    setLoading(true);
    const unsub2 = onSnapshot(onlineUserCol, (snapshot) => {
      let data: UserData[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data() as UserData);
      });
      setOnlineUsers(data);
      setLoading(false);
    });
    return () => {
      unsub2();
    };
  }, [firestore]);

  // creating a badge based upon the talk status of the user
  const badge = (user: UserData) => {
    if (user.status === "want_to_talk") {
      return (
        <Button
          onClick={() => handleStatus(user)}
          size="xs"
          fontSize="xs"
          mr={2}
          bg="green.100"
          color="green.800"
          _hover={{ bg: "green.100", color: "green.800" }}
          px={2}
          rounded="md"
        >
          話したい
        </Button>
      );
    }

    if (user.status === "do_not_want_to_talk") {
      return (
        <Button
          onClick={() => handleStatus(user)}
          size="xs"
          fontSize="xs"
          mr={2}
          bg="red.100"
          color="red.800"
          _hover={{ bg: "green.100", color: "green.800" }}
          px={2}
          rounded="md"
        >
          話しかけNG
        </Button>
      );
    }

    if (user.status === "lets_talk") {
      return (
        <Button
          onClick={() => handleStatus(user)}
          size="xs"
          fontSize="xs"
          mr={2}
          bg="blue.100"
          color="blue.800"
          _hover={{ bg: "blue.100", color: "blue.800" }}
          px={2}
          rounded="md"
        >
          話しかけOK
        </Button>
      );
    }
  };

  const handleStatus = (user: UserData) => {
    if (currentUser.id === user.id){
      setUserStatusModelState({ open: true });
    }
  };

  return (
    <VStack w="full" h="100vh" alignItems="center" p={6}>
        <InputGroup width={{ base: "xs", sm: "sm", md: "lg", lg: "2xl" }} mb={5}>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='red.400' mb={1} />} />
          <Input onChange={(e) => setSearchText(e.target.value)} color='gray.700' placeholder="ユーザー検索" fontSize="10pt" _placeholder={{ color: "red.500" }}
            _hover={{ bg: "red.50", border: "solid 1px", borderColor: "red.500" }}
            _focus={{ outline: "none", border: "1px solid", borderColor: "gray.500" }}
            height="34px" bg="white"
          />
      </InputGroup>
      <HStack>
        <HStack
          w={{ lg: "lg", xl: "3xl"}}
          h="full"
          maxH="2xl"
          borderWidth={1}
          borderColor="gray.100"
          display={{ base: "none", sm: "none", md: "none" ,lg: "inherit"}}
        >
          <Flex
            style={{
              overflow: "scroll",
            }}
            flexDirection={"column"}
          >
            <Stage className="stage" width={900} height={600}>
              <Layer>
                <Image image={bgimage} width={900} height={600} />
                {onlineUsers!.map((user) => (
                  <User
                    highLightUser={highLightUserInMap.show}
                    userClicked={highLightUserInMap.userId}
                    showX={user.userPosX}
                    showY={user.userPosY}
                    key={user.id}
                    x={user.userPosX}
                    y={user.userPosY}
                    width={40}
                    height={40}
                    status={user.status}
                    profileImage={user.profileImage}
                    userName={user.name}
                    userId={user.id}
                  />
                ))}
              </Layer>
            </Stage>
          </Flex>
        </HStack>
        <Flex
          flexDirection="column"
          overflowY="auto"
          w={{ base: "sm", sm: "md", lg: "md", xl: "xl" }}
          p={3}
          height="full"
          maxH="2xl"
          borderWidth={{ base: "0", md: "3"}}
          borderColor="gray.200"
        >
          {loading ? <LoadingSpinner /> : null}
          {onlineUsers!.filter((user) => {
            return searchText?.toLowerCase() === "" ? user : user.name.toLowerCase().includes(searchText.toLowerCase())
          }).map((user) => (
            <HStack
              key={user.id}
              w="full"
              bg={'red.50'}
              spacing={2}
              mb={2}
              justifyContent="space-between"
              px={3}
              py={1}
              roundedTop="md"
              fontSize="md"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ bg: "gray.100", cursor: "pointer" }}
              onClick={() =>
                setHighlightUserInMap((prev) => ({
                  ...prev,
                  show: !highLightUserInMap.show,
                  x: user.userPosX,
                  y: user.userPosY,
                  userId: user.id
                }))
              }
            >
              <Flex flexDirection="column">
                <Text fontSize="sm" fontWeight="semibold">
                  {user.name}
                </Text>
                <Text fontSize="sm">{user.companyName}</Text>
              </Flex>
              <ProfileModel />
              <Flex alignItems="center">
                <StatusModel />
                {badge(user)}
                <Button
                  size="xs"
                  rounded="full"
                  color="white"
                  bg="red.500"
                  border="1px solid"
                  borderColor="red.500"
                  _hover={{
                    border: "1px solid",
                    borderColor: "red.500",
                    bg: "white",
                    color: "red.500",
                  }}
                  onClick={() => handleShowProfile(user)}
                  className="my__button"
                >
                  Profile
                </Button>
              </Flex> 
            </HStack>
          ))}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default Dashboard;
