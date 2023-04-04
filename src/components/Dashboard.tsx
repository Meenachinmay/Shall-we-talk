import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import { useRecoilState, useSetRecoilState } from "recoil";
import useImage from "use-image";
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

import { useNavigate, useParams } from "react-router-dom";
import { myMessagesModelState } from "../atoms/myMessagesModelState";
import { Message } from "../types/Message";
import ViewMessagesModel from "./Model/Message/ViewMessages";

const Dashboard: React.FC = () => {
  const setProfileModelState = useSetRecoilState(profileModelState);
  const setUserProfileState = useSetRecoilState(userProfileState);
  const setUserStatusModelState = useSetRecoilState(userStatusModelState);
  const [highLightUserInMap, setHighlightUserInMap] =
    useRecoilState(showUserInMapState);
  const [onlineUsers, setOnlineUsers] = useState<UserData[] | null>([]);
  const [loading, setLoading] = useState(false);
  const onlineUserCol = collection(firestore, "vs-users");
  const requestsCol = collection(firestore, "co-workingSpaces");
  const [messageModel, setMyMessagesModelState] =
    useRecoilState(myMessagesModelState);
  const [searchText, setSearchText] = useState("");
  const [spaceDetails, setSpaceDetails] = useState<{
    email: string;
    vsImage: string;
    noOfPeople: number;
    keyActivated: boolean;
    virtualSpaceAlloted: boolean;
  }>({
    email: "",
    vsImage: "",
    noOfPeople: 0,
    keyActivated: false,
    virtualSpaceAlloted: false,
  });
  const [bgimage] = useImage(spaceDetails.vsImage);
  const navigate = useNavigate();

  // getting email and key from login page / create profile page
  const { email } = useParams();

  const [currentUser] = useRecoilState(currentUserState);

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
          id: doc.data().userId,
          name: doc.data().name,
          email: doc.data().email,
          companyName: doc.data().companyName,
          companyProfile: doc.data().companyProfile,
          workProfile: doc.data().workProfile,
          hobbies: doc.data().hobbies,
          pet: doc.data().pet,
          profileImage: doc.data().profileImage,
          pr: doc.data().pr,
          status: user.status,
        }));
      });
      setProfileModelState((prev) => ({
        ...prev,
        loadingProfileInModel: false,
      }));
    });
  };

  // this use effect to load all the logged in users from the database
  useEffect(() => {
    setLoading(true);
    const unsub2 = onSnapshot(onlineUserCol, (snapshot) => {
      let data: UserData[] = [];
      if (snapshot.docChanges().length) {
        snapshot.forEach((doc) => {
          if (doc.data().spaceId === window.atob(email!)){
            data.push(doc.data() as UserData);
          }
        });
        setOnlineUsers(data);
        setLoading(false);
      }
    });

    // fetching details of a particular space
    async function fetchSpaceDetails() {
      const docRef = doc(
        firestore,
        "co-workingSpaces",
        `spaceId-${window.atob(email!)}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSpaceDetails({
          email: docSnap.data().email,
          vsImage: docSnap.data().vsImage,
          noOfPeople: docSnap.data().noOfPeople,
          keyActivated: docSnap.data().keyActivated,
          virtualSpaceAlloted: docSnap.data().virtualSpaceAlloted,
        });
      } else {
        console.log("no such doc available");
      }
    }

    fetchSpaceDetails();

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
          mr={2}
          bg="green.100"
          color="green.800"
          _hover={{ bg: "green.100", color: "green.800" }}
          px={2}
          rounded="md"
          style={{ fontSize: "10px" }}
          width="90px"
        >
          話し相手探し中
        </Button>
      );
    }

    if (user.status === "do_not_want_to_talk") {
      return (
        <Button
          onClick={() => handleStatus(user)}
          size="xs"
          mr={2}
          bg="red.100"
          color="red.800"
          _hover={{ bg: "red.100", color: "red.800" }}
          px={2}
          rounded="md"
          style={{ fontSize: "10px" }}
          width="90px"
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
          mr={2}
          bg="blue.100"
          color="blue.800"
          _hover={{ bg: "blue.100", color: "blue.800" }}
          px={2}
          rounded="md"
          style={{ fontSize: "10px" }}
          width="90px"
        >
          話しかけOK
        </Button>
      );
    }
  };

  // see messages of logged in users
  const handleSeeMessage = () => {
    const mq = query(
      collection(firestore, "messages"),
      where("to.id", "==", `${currentUser.id}`)
    );
    try {
      onSnapshot(mq, (snapShot) => {
        let data: Message[] = [];
        snapShot.forEach((doc) => {
          data.push(doc.data() as Message);
        });
        setMyMessagesModelState((prev) => ({
          ...prev,
          messages: data,
          open: true,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle status of current logged in user
  const handleStatus = (user: UserData) => {
    if (currentUser.id === user.id) {
      setUserStatusModelState({ open: true });
    }
  };

  // when a user click on a particular card on dashboard user card list
  const handleUserCardClick = (user: UserData) => {
    setHighlightUserInMap((prev) => ({
      ...prev,
      show: !highLightUserInMap.show,
      x: user.userPosX,
      y: user.userPosY,
      userId: user.id,
    }));
  };

  return (
    <VStack w="full" h="100vh" alignItems="center" p={6}>
      <InputGroup width={{ base: "xs", sm: "sm", md: "lg", lg: "2xl" }} mb={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="red.400" mb={1} />}
        />
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          color="gray.700"
          placeholder="ユーザー検索"
          fontSize="10pt"
          _placeholder={{ color: "red.500" }}
          _hover={{ bg: "red.50", border: "solid 1px", borderColor: "red.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "gray.500",
          }}
          height="34px"
          bg="white"
        />
      </InputGroup>
      <HStack>
        <HStack
          w={{ lg: "lg", xl: "3xl" }}
          h="full"
          maxH="3xl"
          borderWidth={1}
          borderColor="gray.100"
          display={{ base: "none", sm: "none", md: "none", lg: "inherit" }}
        >
          <Flex
            style={{
              overflow: "scroll",
            }}
            flexDirection={"column"}
          >
            <Stage className="stage" width={900} height={600}>
              <Layer>
                {/* this image tag is rendering BG image in the virtual space */}
                <Image image={bgimage} width={900} height={600} />
                {onlineUsers!.map((user) => (
                  <User
                    mobileUser={user.mobileUser}
                    highLightUser={highLightUserInMap.show}
                    userClicked={highLightUserInMap.userId}
                    key={user.id}
                    x={user.userPosX}
                    y={user.userPosY}
                    width={50}
                    height={50}
                    status={user.status}
                    companyName={user.companyName}
                    profileImage={user.profileImage}
                    userName={user.name}
                    userId={user.id}
                    currentLoggedInUser={currentUser.id}
                  />
                ))}
              </Layer>
            </Stage>
          </Flex>
        </HStack>

        <Flex
          flexDirection="column"
          overflowY="auto"
          w={{ base: "400px", sm: "md", lg: "md", xl: "xl" }}
          p={3}
          height="full"
          maxH="2xl"
          borderWidth={{ base: "0", md: "1" }}
          borderColor="gray.200"
        >
          {loading ? <LoadingSpinner /> : null}
          {onlineUsers!
            .filter((user) => {
              return searchText?.toLowerCase() === ""
                ? user
                : user.name.toLowerCase().includes(searchText.toLowerCase());
            })
            .map((user) => (
              <Flex
                key={user.id}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Flex
                  width={{
                    base: "120px",
                    sm: "120px",
                    md: "120px",
                    lg: "150px",
                  }}
                  minWidth={{
                    base: "120px",
                    sm: "120px",
                    md: "120px",
                    lg: "150px",
                  }}
                  h="60px"
                  flexGrow={1}
                  bg={"red.50"}
                  mb={2}
                  justifyContent="space-between"
                  alignItems={"center"}
                  px={3}
                  py={1}
                  roundedTop="md"
                  fontSize="md"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRightColor={"red.50"}
                  borderRightRadius={0}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => handleUserCardClick(user)}
                >
                  <Flex flexDirection="column">
                    <Text fontSize="xs" fontWeight="semibold">
                      {user.name}
                    </Text>
                    <Text
                      fontSize={{
                        base: "10px",
                        sm: "10px",
                        md: "xs",
                        lg: "xs",
                      }}
                    >
                      {user.companyName}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  w={{ base: "200px", sm: "xs", md: "xs", lg: "sm" }}
                  h="60px"
                  flexGrow={1}
                  bg={"red.50"}
                  mb={2}
                  justifyContent="space-between"
                  alignItems={"center"}
                  px={3}
                  py={1}
                  roundedTop="md"
                  fontSize="md"
                  border="1px solid"
                  borderColor="gray.200"
                  borderLeftColor={"red.50"}
                  borderLeftRadius={0}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                >
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexGrow={1}
                  >
                    <ProfileModel />
                    <StatusModel />
                    {badge(user)}
                    <Button
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
                      size={{ base: "xxs", sm: "xxs", md: "xs", lg: "xs" }}
                      p={1}
                      onClick={() => handleShowProfile(user)}
                      className="my__button"
                      style={{ fontSize: "9px" }}
                      display={{ base: "none", sm: "inherit" }}
                    >
                      クイックプロフ
                    </Button>
                    <ViewMessagesModel />
                    {currentUser.id !== user.id ? (
                      <Button
                        bg="red.500"
                        color="white"
                        _hover={{
                          bg: "white",
                          color: "red.500",
                          border: "1px solid",
                        }}
                        size={{ base: "xxs", sm: "xxs", md: "xs", lg: "xs" }}
                        p={1}
                        style={{ fontSize: "9px" }}
                        onClick={() => navigate(`/profile/${user.id}`)}
                      >
                        メッセージ送信
                      </Button>
                    ) : (
                      <Button
                        bg="red.500"
                        color="white"
                        _hover={{
                          bg: "white",
                          color: "red.500",
                          border: "1px solid",
                        }}
                        size={{ base: "xxs", sm: "xxs", md: "xs", lg: "xs" }}
                        p={1}
                        width={"80px"}
                        style={{ fontSize: "9px" }}
                        onClick={handleSeeMessage}
                      >
                        メッセージ
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            ))}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default Dashboard;
