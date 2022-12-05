import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
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
import { firestore } from "../firebase/clientApp";
import { UserData } from "../types/UserData";
import LoadingSpinner from "./customUIComponents/LoadingSpinner";
import ProfileModel from "./Model/Profile/ProfileModel";
import StatusModel from "./Model/Status/StatusModel";
import User from "./User";

const Dashboard: React.FC = () => {
  const setProfileModelState = useSetRecoilState(profileModelState);
  const setUserProfileState = useSetRecoilState(userProfileState);
  const setUserStatusModelState = useSetRecoilState(userStatusModelState);
  const [showUserInMap, setShowUserInMap] = useRecoilState(showUserInMapState);
  const [onlineUsers, setOnlineUsers] = useState<UserData[] | null>([]);
  const [loading, setLoading] = useState(false);
  const onlineUserCol = collection(firestore, "vs-users");
  const profileCol = collection(firestore, "userProfiles");
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );

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
  useEffect(() => {
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
  }, [firestore, currentUser.id]);

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
    setUserStatusModelState({ open: true });
  };

  return (
    <VStack w="full" h="100vh" alignItems="center" p={6}>
      <HStack>
        <HStack
          w="3xl"
          h="full"
          maxH="2xl"
          borderWidth={1}
          borderColor="gray.100"
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
                    show={showUserInMap.show}
                    showX={showUserInMap.x}
                    showY={showUserInMap.y}
                    key={user.id}
                    x={100}
                    y={100}
                    width={40}
                    height={40}
                    status={user.status}
                  />
                ))}
              </Layer>
            </Stage>
          </Flex>
        </HStack>
        <Flex
          flexDirection="column"
          overflowY="auto"
          w="xl"
          p={3}
          height="full"
          maxH="2xl"
          borderWidth={1}
          borderColor="gray.200"
        >
          {loading ? <LoadingSpinner /> : null}
          {!onlineUsers ? "no user is logged-in now" : null}
          {onlineUsers!.map((user) => (
            <HStack
              key={user.id}
              w="full"
              bg="white"
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
                setShowUserInMap((prev) => ({
                  ...prev,
                  show: !showUserInMap.show,
                  x: 100,
                  y: 100,
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
                  bg="blue.500"
                  border="1px solid"
                  borderColor="blue.500"
                  _hover={{
                    border: "1px solid",
                    borderColor: "blue.500",
                    bg: "white",
                    color: "blue.500",
                  }}
                  onClick={() => handleShowProfile(user)}
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
