import {
  Flex,
  Text,
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
  Heading,
  Button,
} from "@chakra-ui/react";
import {
  onSnapshot,
  collection,
  limit,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../atoms/currentUserState";
import { firestore } from "../firebase/clientApp";
import { useParams } from "react-router-dom";
import SendMessageModel from "../Model/Message/SendMessageModel";
import { sendMessageModelState } from "../../atoms/sendMessageModelState";
import { Message } from "../../types/Message";
import { myMessagesModelState } from "../../atoms/myMessagesModelState";
import ViewMessages from "../Model/Message/ViewMessages";
import { useNavigate } from "react-router-dom";

import "../homepage.css";
import { imageViewModelState } from "../../atoms/imageViewModelState";
import ImageViewModel from "../Model/Images/ImageViewModel";

type Connection = {
  id: number;
  user1: string;
  user2: string;
  connected: boolean;
  status: string;
};

const ViewProfile: React.FC = () => {
  const navigate = useNavigate();

  const connectionCol = collection(firestore, "connections");
  const profileCol = collection(firestore, "userProfiles");
  const messageCol = collection(firestore, "messages");
  const [currentUser] = useRecoilState(currentUserState);
  const [sendMessageState, setSendMessageModelState] = useRecoilState(
    sendMessageModelState
  );
  const [myMessages, setMyMessagesModelState] =
    useRecoilState(myMessagesModelState);
  const [sendRequest, setSendRequest] = useState(false);
  const [connection, setConnection] = useState<Connection>({
    id: 0,
    user1: "",
    user2: "",
    connected: false,
    status: "",
  });
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    profileImage: string;
    companyName: string;
    companyProfile: string;
    workProfile: string;
    hobbies: string;
    pet: string;
    pr: string;
  }>({
    name: "",
    email: "",
    profileImage: "",
    companyProfile: "",
    companyName: "",
    workProfile: "",
    hobbies: "",
    pr: "",
    pet: "",
  });

  const [fetchingConnection, setFetchingConnection] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ status: string }>({ status: "" });
  const { id } = useParams();
  const [imageViewModel, setImageViewModelState] = useRecoilState(imageViewModelState)

  //プロフィール写真をアップデートするために、これを実装してください。

  // const handleSendRequest = async () => {
  //   try {
  //     setSendRequest(true);
  //     await setDoc(
  //       doc(firestore, `connections/connectionId-${currentUser.id}`),
  //       {
  //         connected: false,
  //         status: "pending",
  //         user1: currentUser.id,
  //         user2: id,
  //       }
  //     );

  //     // create a new notification for receiver of this connection request (user2 => sender)
  //     try {
  //       await setDoc(
  //         doc(firestore, `notifications/notificationId-${currentUser.id}`),
  //         {
  //           message: `${currentUser.email} sent you a talk request.`,
  //           receiver: id,
  //           sender: currentUser.email,
  //           type: "requestSent",
  //           seen: false,
  //         }
  //       );
  //     } catch (error) {
  //       console.log("notification creation error ");
  //     }
  //     setSendRequest(false);
  //   } catch (error) {
  //     console.log("create connection request " + error);
  //   }
  // };

  const handleSendMessage = () => {
    setSendMessageModelState({ open: true });
  };

  const handleSeeMessage = () => {

    const mq = query(messageCol, where("to.id", "==", `${currentUser.id}`));

    try {
      setLoadingMessage(true);
      onSnapshot(mq, (snapShot) => {
        let data: Message[] = [];
        snapShot.forEach((doc) => {
          data.push(doc.data() as Message);
        });
        setLoadingMessage(false);
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

  useEffect(() => {
    setLoading(true);
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
          profileImage: doc.data().profileImage,
          companyProfile: doc.data().companyProfile,
          companyName: doc.data().companyName,
          hobbies: doc.data().hobbies,
          pr: doc.data().pr,
          pet: doc.data().pet,
          workProfile: doc.data().workProfile,
        });
      });
      setLoading(false);
    });

    const onlineUserQuery = query(
      collection(firestore, "vs-users"),
      where("id", "==", `${id}`),
      limit(1)
    );

    const unsub2 = onSnapshot(onlineUserQuery, (snapShot) => {
      snapShot.forEach((doc) => {
        setStatus({ status: doc.data().status });
      });
    });

    // const q = query(
    //   connectionCol,
    //   where("user1", "==", `${currentUser.id}`),
    //   where("user2", "==", `${id}`),
    //   limit(1)
    // );
    // const q2 = query(
    //   connectionCol,
    //   where("user1", "==", `${id}`),
    //   where("user2", "==", `${currentUser.id}`),
    //   limit(1)
    // );

    // setFetchingConnection(true);
    // const unsub2 = onSnapshot(q, (snapShot) => {
    //   snapShot.forEach((doc) => {
    //     setConnection(doc.data() as Connection);
    //   });
    //   setFetchingConnection(false);
    // });

    // setFetchingConnection(true);
    // const unsub3 = onSnapshot(q2, (snapShot) => {
    //   snapShot.forEach((doc) => {
    //     setConnection(doc.data() as Connection);
    //   });
    //   setFetchingConnection(false);
    // });

    const revokeEverything = () => {
      unsub();
      unsub2();
      // unsub3()
    };

    return () => revokeEverything();
  }, [firestore, id]);

  function renderEditButton() {
    if (currentUser.id === id) {
      return (
        <div>
          <Button
            size={"sm"}
            fontSize={"xs"}
            ml={3}
            bg="red.400"
            color="white"
            onClick={() => navigate(`/update-profile/${currentUser.id}`)}
          >
            プロフィール編集
          </Button>
        </div>
      );
    }
  }

  return (
    <VStack h="full" spacing={0}>
      <Container maxW="2xl" bg="red.50" mt={6} mb={6} rounded="md" shadow="md">
        <Flex
          flexDirection="column"
          alignItems="start"
          py={6}
          w="full"
          maxW="2xl"
        >
          <Box p={6} w="full" h="full" overflow="auto">
            <Stat mt={6}>
              <StatLabel color="gray.500">Profile of</StatLabel>
              <StatNumber>{userProfile.name}</StatNumber>
            </Stat>
            <Box w="full">
              <Divider color="gray.100" />
            </Box>
            <Flex py={3} flexDirection="column" justifyContent="flex-start">
              <Flex alignItems={"center"}>
                <ImageViewModel imageUrl={userProfile.profileImage} />
                <Avatar
                  onClick={() => setImageViewModelState({ open: true })}
                  name={userProfile.name}
                  size="xl"
                  src={userProfile.profileImage}
                >
                  <AvatarBadge
                    bg={
                      status.status === "want_to_talk"
                        ? `green.500`
                        : status.status === "do_not_want_to_talk"
                        ? `red.500`
                        : "blue.500"
                    }
                    boxSize={6}
                    borderWidth={4}
                  ></AvatarBadge>
                </Avatar>
               { renderEditButton() } 
              </Flex>
              <Box w="full" h="full" mt={1}>
                <VStack w="full" h="full" spacing={4} overflowY="auto">
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48}>
                      所属名
                    </Heading>
                    {loading ? (
                      <Text color="gray.500" fontSize="sm">
                        Loading company name
                      </Text>
                    ) : (
                      <Text flex={1} color="gray.500" fontSize="sm">
                        {userProfile.companyName}
                      </Text>
                    )}
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48}>
                      所属組織の紹介
                    </Heading>
                    <Text flex={1} color="gray.500" fontSize="sm">
                      {userProfile.companyProfile}
                    </Text>
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48}>
                     職業プロフィール 
                    </Heading>
                    <Text color="gray.500" flex={1} fontSize="sm">
                      {userProfile.workProfile}
                    </Text>
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48}>
                      趣味
                    </Heading>
                    <Text color="gray.500" flex={1} fontSize="sm">
                      {" "}
                      {userProfile.hobbies}
                    </Text>
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48}>
                      飼っているペット
                    </Heading>
                    <Text color="gray.500" flex={1} fontSize="sm">
                      {userProfile.pet}
                    </Text>
                  </HStack>
                  <Flex flexDirection="column" w="full" maxHeight="150px" mt={6} overflowY="scroll">
                    <Heading mb={2} size="xs">
                      自己紹介文
                    </Heading>
                    <Text w="full" h="full" fontSize="xs" color="gray.500">
                      {userProfile.pr}
                    </Text>
                  </Flex>
                </VStack>
                {currentUser.id === id ? (
                  <Flex alignItems='center' justifyContent='center'>
                    <ViewMessages />
                    <Button
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "red.500",
                        color: "red.500",
                      }}
                      fontSize={{ base: "8pt", sm: "9pt", md: "10pt"}}
                      fontWeight={700}
                      bg="red.500"
                      color="white"
                      variant="solid"
                      height="36px"
                      width="50%"
                      mt={3}
                      onClick={() => handleSeeMessage()}
                      isLoading={loadingMessage}
                      style={{ boxShadow: "5px 5px" }}
                      className="my__button"
                    >
                      届いたメッセージを見る
                    </Button>
                  </Flex>
                ) : (
                    <Flex alignItems={'center'} justifyContent={'center'}>
                      <SendMessageModel id={id as string} />
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
                        width="50%"
                        onClick={() => handleSendMessage()}
                        className="my__button"
                      >
                        メッセージを送信する
                      </Button>
                    </Flex>
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </VStack>
  );
};

export default ViewProfile;
