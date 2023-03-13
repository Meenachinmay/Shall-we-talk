import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModelState } from "../../../atoms/authModelState";
import { currentUserState } from "../../../atoms/currentUserState";
import { auth, firestore } from "../../firebase/clientApp";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { currentUserProfileState } from "../../../atoms/currentUserProfileState";
import "../../homepage.css";
import { currentUserLogoutState } from "../../../atoms/currentUserLogoutState";
import { generateRandomPositions } from "../../../utilservices/ExternalMethods";
import { myMessagesModelState } from "../../../atoms/myMessagesModelState";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuthModelState = useSetRecoilState(authModelState);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const [userLogout, setCurrentUserLogoutState] = useRecoilState(
    currentUserLogoutState
  );

  const [messages, setMyMessages] = useRecoilState(
    myMessagesModelState
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userC) => {
        // here check for this user email address in profile collection
        const docRef = doc(
          firestore,
          "userProfiles",
          `userProfileId-${userC.user.uid}`
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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

          // setting current user state (id, email, online, status)
          setCurrentUserState((prev) => ({
            ...prev,
            id: userC.user.uid,
            email: userC.user.email!,
            online: "true",
            status: "do_not_want_to_talk",
          }));

          // here add user in vs-user's collection
          try {
            await setDoc(doc(firestore, `vs-users/userId-${userC.user.uid}`), {
              companyName: docSnap.data().companyName,
              id: userC.user.uid,
              name: docSnap.data().name,
              online: true,
              status: "do_not_want_to_talk",
              userPosX: generateRandomPositions(100, 500).x,
              userPosY: generateRandomPositions(100, 500).y,
              profileImage: docSnap.data().profileImage,
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          // redirect user to create profile page
          navigate(`/create-profile`);
        }

        setCurrentUserLogoutState((prev) => ({
          ...prev,
          currentUserLoggedOut: false,
        }));

        setMyMessages((prev) => ({
          ...prev,
          messages: [],
          open: false
        })) 

        setLoading(false);
        setAuthModelState((prev) => ({
          ...prev,
          open: false,
        }));

        toast({
          title: "ログイン成功！",
          description: "SWTでの体験をお楽しみください",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate(`/dashboard`);
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast({
            title: "サーバーエラー",
            description: "このメールアドレスは登録されていません",
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
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="Eメール"
        type="email"
        mb={2}
        mt={2}
        onChange={(e) => setEmail(e.target.value)}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Input
        name="password"
        placeholder="パスワード"
        mb={2}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Button
        isLoading={loading}
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
        mt={2}
        mb={2}
        className="my__button"
      >
        ログイン
      </Button>
      <Flex
        justifyContent="center"
        mb={2}
        flexDirection={"column"}
        alignItems="center"
      >
        <Text fontSize={{ base: "8pt", lg: "9pt" }} mr={1}>
          パスワードを忘れた方はこちら
        </Text>
        <Text
          fontSize={{ base: "8pt", lg: "9pt" }}
          color="red.500"
          cursor="pointer"
          onClick={() =>
            setAuthModelState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          パスワードのリセット
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>新規ユーザー様ですか？</Text>
        <Text
          onClick={() =>
            setAuthModelState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
          color="red.500"
          fontWeight={700}
          cursor="pointer"
          fontSize={{ base: "8pt", lg: "9pt" }}
        >
          ユーザー登録
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
