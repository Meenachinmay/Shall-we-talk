import { Button, Input, useToast } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../../atoms/authModelState";
import { currentUserState } from "../../atoms/currentUserState";
import { auth } from "../firebase/clientApp";

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const { email, accessKey } = useParams();
  const navigate = useNavigate();
  const setAuthModelState = useSetRecoilState(authModelState);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ type: string; message: string } | null>({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const setCurrentUserState = useSetRecoilState(currentUserState);

  const toast = useToast();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="Eメール"
        type="email"
        mb={2}
        mt={2}
        onChange={(e) => setUserEmail(e.target.value)}
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
        onChange={(e) => setUserPassword(e.target.value)}
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
        name="confirmPassword"
        placeholder="パスワードを再入力"
        mb={2}
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "red.500",
          color: "red.500",
        }}
        isLoading={loading}
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
        ユーザー登録
      </Button> 
    </form>
  );
};

export default Register;
