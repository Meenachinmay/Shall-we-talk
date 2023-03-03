import React, { useEffect, useState } from "react";
import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/clientApp";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState } from "../../atoms/currentUserState";
import { currentUserProfileState } from "../../atoms/currentUserProfileState";
import { currentUserLogoutState } from "../../atoms/currentUserLogoutState";
import { myMessagesModelState } from "../../atoms/myMessagesModelState";
import { signInWithEmailAndPassword } from "firebase/auth";
import { generateRandomPositions } from "../../utilservices/ExternalMethods";
import { authModelState } from "../../atoms/authModelState";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const toast = useToast();
  const { email } = useParams();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [key, setAccessKey] = useState<string>("");
  const navigate = useNavigate();
  const accessKeysCol = collection(firestore, "access-keys");
  const [verifyingKey, setVerifyingKey] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const setAuthModelState = useSetRecoilState(authModelState);
  const [userLogout, setCurrentUserLogoutState] = useRecoilState(
    currentUserLogoutState
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMyMessages] = useRecoilState(myMessagesModelState);

  console.log(window.btoa("chinmayanand896@gmail.com"));

  // this method handle login logic
  async function handleLogin() {
    setVerifyingKey(true);
    const q = query(
      accessKeysCol,
      where("spaceId", "==", `${email}`),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // if accessKey from URL and accessKey in respective space are same
      // then setSuccess True
      if (doc.data().accessKey === key) {
        setSuccess(true);
        setVerifyingKey(false);
      } else {
        alert("please contact your space to get a correct space key.");
        setSuccess(false);
        setVerifyingKey(false);
      }
    });

    // set login logic here. if login success then
    if (success) {
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

          if (docSnap.exists() && success) {
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
              await setDoc(
                doc(firestore, `vs-users/userId-${userC.user.uid}`),
                {
                  companyName: docSnap.data().companyName,
                  id: userC.user.uid,
                  accessKey: docSnap.data().accessKey,
                  spaceId: email,
                  name: docSnap.data().name,
                  online: true,
                  status: "do_not_want_to_talk",
                  userPosX: generateRandomPositions(100, 500).x,
                  userPosY: generateRandomPositions(100, 500).y,
                  profileImage: docSnap.data().profileImage,
                }
              );
            } catch (error) {
              console.log(error);
            }
          } else {
            // redirect user to create profile page
            navigate(`/create-profile/${email}/${key}`);
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

          setAuthModelState((prev) => ({
            ...prev,
            open: false,
          }));

          setLoading(false);
          navigate(`/dashboard/${email}/${key}`);

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
    }
  }

  // fetch space with email from params
  // useEffect(() => {
  //   async function checkAccesskey() {
  //     setFetchingYourSpace(true);
  //     const q = query(
  //       accessKeysCol,
  //       where("spaceId", "==", `${email}`),
  //       limit(1)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // if accessKey from URL and accessKey in respective space are same
  //       // then setSuccess True
  //       if (doc.data().accessKey === accessKey) {
  //         setSuccessOk(true);
  //         setAccessKey(doc.data().accessKey);
  //         setFetchingYourSpace(false);
  //       }
  //     });
  //   }
  //   checkAccesskey();

  //   return () => {};
  // }, [email, accessKeysCol]);

  return (
    <>
      <Flex
        width={"full"}
        flexGrow={1}
        height={"100vh"}
        bg="red.600"
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex
          width={"md"}
          alignItems="center"
          justifyItems={"center"}
          flexDirection={"column"}
        >
          <Input
            required
            autoComplete="none"
            width={"full"}
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            mb={5}
            placeholder="enter email"
          />
          <Input
            required
            autoComplete="none"
            width={"full"}
            onChange={(e) => setUserPassword(e.target.value)}
            type="password"
            mb={5}
            placeholder="enter password"
          />
          <Input
            required
            autoComplete="none"
            onChange={(e) => setAccessKey(e.target.value)}
            type="text"
            mb={5}
            placeholder="enter access key"
          />
          <Button
            loadingText={`${
              verifyingKey
                ? "Access Key verifying"
                : loading
                ? "Signing in..."
                : null
            }`}
            isLoading={loading || verifyingKey}
            size={"sm"}
            width={"xs"}
            onClick={handleLogin}
          >
            Login to Dashboard
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
