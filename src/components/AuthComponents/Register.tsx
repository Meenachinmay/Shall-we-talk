import {
  Button, Center, Flex, Input, Text, useMediaQuery, useToast
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../../atoms/authModelState";
import { currentUserState } from "../../atoms/currentUserState";
import { auth, firestore } from "../firebase/clientApp";

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const setAuthModelState = useSetRecoilState(authModelState);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessKey, setAccesskey] = useState("");
  const [error, setError] = useState<{ type: string; message: string } | null>({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [addingUserToUsers, setAddingUserToUsers] = useState<boolean>(false);
  const setCurrentUserState = useSetRecoilState(currentUserState);
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const [fetchingSpace, setFetchingSpace] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);

  const [isLessThan393] = useMediaQuery("(max-width: 393px)");

  const onSubmit = () => {
    if (error) {
      setError(null);
    }
    if (userPassword !== confirmPassword) {
      toast({
        title: "フォウムエラー",
        description: "パスワードが一致しません。もう一度お確かめください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userC) => {
        setLoading(false);
        setAuthModelState((prev) => ({
          ...prev,
          open: false,
        }));

        setCurrentUserState((prev) => ({
          ...prev,
          id: userC.user.uid,
          email: userC.user.email!,
        }));

        // add this user to users colection in firebase
        addUserToUsers(userC);
        setLoading(false);

        navigate(`/create-profile/${email}/${accessKey}`);

        toast({
          title: "新規登録終わり",
          description: "ご利用のメールアドレスはデータベースに保存されました。",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        // here you can redirect user to login page so they can login now with new address
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast({
            title: "フォウムエラー",
            description: "このメールアドレスは既に使用されています。",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast({
            title: "フォウムエラー",
            description: "パスワードは６文字以上に設定してください。",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  // method to add a User to Users collection in firebase at the time of
  // registration
  async function addUserToUsers(userC: UserCredential) {
    setAddingUserToUsers(true);
    await setDoc(doc(firestore, `users`, `userId-${userC.user.uid}`), {
      id: userC.user.uid,
      email: userC.user.email,
      accessKey: accessKey,
      spaceId: window.atob(email),
    });
    setAddingUserToUsers(false);
  }

  // get space id with the access-key provided by the user
  useEffect(() => {
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
        <Text mt={5} fontSize={"3xl"}>
          新規登録
        </Text>
        <Input
          name="email"
          placeholder="Eメール"
          type="email"
          mb={2}
          mt={2}
          onChange={(e) => setUserEmail(e.target.value)}
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
        <Input
          name="password"
          placeholder="パスワード"
          mb={2}
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
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

        <Input
          name="confirmPassword"
          placeholder="パスワードを再入力"
          mb={2}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        <Input
          name="access key"
          placeholder="バーチャルスペースのアクセスキーを入力してください"
          mb={2}
          type="password"
          onChange={(e) => setAccesskey(e.target.value)}
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
          isLoading={loading || fetchingSpace}
          loadingText={
            loading
              ? "新規登録中"
              : fetchingSpace
              ? "スペース詳細を取り込み中"
              : ""
          }
          type="submit"
          fontSize="10pt"
          fontWeight={700}
          bg="red.500"
          color="white"
          variant="solid"
          height="36px"
          width={isLessThan393 ? "80%" : "xs"}
          mt={2}
          mb={2}
          className="my__button"
          disabled={!test}
          onClick={onSubmit}
        >
          ユーザー登録
        </Button>
        <Text
          onClick={() => navigate("/user-login", { replace: false })}
          fontSize={"xs"}
          color="red.500"
          cursor={"pointer"}
          _hover={{ color: "red.600", fontsize: "sm" }}
        >
          既にアカウントをお持ちの場合はこちら
        </Text>
      </Flex>
    </Center>
  );
};

export default Register;
