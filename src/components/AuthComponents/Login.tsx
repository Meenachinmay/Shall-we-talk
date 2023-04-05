import {
  Button, Center, Flex, Input, Text, useToast, VStack
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserLogoutState } from "../../atoms/currentUserLogoutState";
import { currentUserProfileState } from "../../atoms/currentUserProfileState";
import { currentUserState } from "../../atoms/currentUserState";
import { myMessagesModelState } from "../../atoms/myMessagesModelState";
import { generateRandomPositions } from "../../utilservices/ExternalMethods";
import { auth, firestore } from "../firebase/clientApp";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const toast = useToast();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [accessKey, setAccessKey] = useState<string>("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const [userLogout, setCurrentUserLogoutState] = useRecoilState(
    currentUserLogoutState
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMyMessages] = useRecoilState(myMessagesModelState);

  const [email, setEmail] = useState<string>("");
  const [fetchingSpace, setFetchingSpace] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

  // this method handle login logic
  async function handleLogin() {
   
    if (!userEmail || !userPassword || !accessKey) {
      alert('please fill all the fields to login')
      return
    }

    // set login logic here. if login success then
    setLoading(true);
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (userC) => {
        // here check for this user email address in profile collection
        const docRef = doc(
          firestore,
          "userProfiles",
          `userProfileId-${userC.user.uid}`
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // here add user in vs-user's collection
          const a = generateRandomPositions(100, 500).x;
          const b = generateRandomPositions(100, 500).y;
          try {
            await setDoc(doc(firestore, `vs-users/userId-${userC.user.uid}`), {
              companyName: docSnap.data().companyName,
              id: userC.user.uid,
              spaceId: window.atob(email),
              name: docSnap.data().name,
              online: true,
              status: "do_not_want_to_talk",
              userPosX: a,
              userPosY: b,
              profileImage: docSnap.data().profileImage,
              mobileUser: mobile ? true : false,
            });
          } catch (error) {
            console.log(error);
          }

          // setting current user state (id, email, online, status)
          setCurrentUserState((prev) => ({
            ...prev,
            id: userC.user.uid,
            email: userC.user.email!,
            online: "true",
            status: "do_not_want_to_talk",
            userPosX: a,
            userPosY: b,
            spaceId: window.atob(email),
          }));

          // setting current user profile (id, name, companyName, companyProfile, workProfile, profileImage, hobbies, pet, pr)
          setCurrentUserProfileState((prev) => ({
            ...prev,
            id: userC.user.uid,
            name: docSnap.data().name,
            companyName: docSnap.data().companyName,
            companyProfile: docSnap.data().companyProfile,
            profileImage: docSnap.data().profileImage,
            pet: docSnap.data().pet,
            pr: docSnap.data().pr,
            status: docSnap.data().status,
            hobbies: docSnap.data().hobbies,
            workProfile: docSnap.data().workProfile,
          }));
        } else {
          // redirect user to create profile page
          navigate(`/create-profile/${email}/${accessKey}`);
        }

        setCurrentUserLogoutState((prev) => ({
          ...prev,
          currentUserLoggedOut: false,
        }));

        setMyMessages((prev) => ({
          ...prev,
          messages: [],
          open: false,
        }));

        setLoading(false);
        navigate(`/dashboard/${email}`);

        toast({
          title: "ログイン成功！",
          description: "SWTでの体験をお楽しみください",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast({
            title: "サーバーエラー",
            description: "wrong password.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        if ((error.message = "Firebase: Error (auth/user-not-found).")) {
          toast({
            title: "サーバーエラー",
            description: "このメールアドレスは登録されていません",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      });
  }

  // get space id with the access-key provided by the user
  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    }

    async function _fetch() {
      setFetchingSpace(true);
      const q = query(
        collection(firestore, "access-keys"),
        where("accessKey", "==", `${accessKey}`),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          setEmail(window.btoa(doc.data().spaceId));
          setTest(true);
          setFetchingSpace(false);
        }
      });
    }
    _fetch();
    setFetchingSpace(false);
    setTest(false);

    return () => {};
  }, [accessKey]);

  return (
    <Center width={"full"} height={"full"}>
      <Flex
        flexDir={"column"}
        style={{ minHeight: "100vh" }}
        width={"lg"}
        alignItems="center"
        p={5}
      >
        <Text mt={5} mb={5} fontSize={"3xl"}>
          ログイン
        </Text>
        <VStack width={"full"}>
          <Input
            required
            autoComplete="none"
            width={"full"}
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            placeholder="Eメール"
            bg={"white"}
            fontSize="10pt"
          />
          <Input
            required
            autoComplete="none"
            width={"full"}
            onChange={(e) => setUserPassword(e.target.value)}
            type="password"
            mb={5}
            placeholder="パスワード"
            bg={"white"}
            fontSize="10pt"
          />
          <Input
            required
            type="password"
            autoComplete="none"
            onChange={(e) => setAccessKey(e.target.value)}
            mb={3}
            placeholder="バーチャルスペースのアクセスキーを入力してください"
            bg={"white"}
            fontSize="10pt"
          />
          <Text color={"red.500"} fontSize={"8px"}>
            正しいアクセスキーを入力するとボタンがアクティブになります
          </Text>
          <Button
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "red.500",
              color: "red.500",
            }}
            loadingText={
              loading
                ? "サインイン中"
                : fetchingSpace
                ? "スペース詳細を取り込み中"
                : ""
            }
            isLoading={loading || fetchingSpace}
            size={"sm"}
            width={"xs"}
            onClick={handleLogin}
            disabled={!test}
            fontSize="10pt"
            fontWeight={700}
            bg="red.500"
            color="white"
            variant="solid"
            height="36px"
          >
            ダッシュボードにログイン
          </Button>
          <Text
            onClick={() => navigate("/password-reset", { replace: false })}
            fontSize={"xs"}
            color="red.500"
            cursor={"pointer"}
            _hover={{ color: "red.600", fontsize: "sm" }}
          >
            パスワードを変更する
          </Text>
        </VStack>
      </Flex>
    </Center>
  );
};

export default Login;
