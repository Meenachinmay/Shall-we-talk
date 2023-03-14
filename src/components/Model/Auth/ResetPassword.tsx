import React, { useState } from "react";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { BsDot, BsBellFill } from "react-icons/bs";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true)
    await sendPasswordResetEmail(auth, email);
    setLoading(false)
    setSuccess(true);
  };

  return (
    <Flex p={5} direction="column" alignItems="center" width="100%" height={"100vh"}>
      <Icon as={BsBellFill} color="brand.100" fontSize={40} mb={2} />
      { success ? 
      <Text fontWeight={700} fontSize={{ base: "xs", sm: "sm", md: "sm"}} mb={2}>
        お使いのメールアドレスまでパスワードアップデートリンクをお送りいたしました。
      </Text> : <Text fontWeight={700} mb={2}>
        パスワードをリセットしますか？
      </Text> }
      {success ? (
        <Text fontSize={'xs'} color="white" fontWeight={700} bg="red.400" p={3} borderRadius={3} mb={4}>お使いのメールアドレスをご確認ください。</Text>
      ) : (
        <>
          <Text color="red.500" fontSize="sm" textAlign="center" mb={2}>
            アカウントに登録されたメールアドレスをご入力ください。パスワードをリセットするためのリンクが送信されます。
          </Text>
          <form onSubmit={onSubmit}>
            <Input
              required
              name="email"
              placeholder="email"
              type="email"
              mb={2}
              onChange={(event) => setEmail(event.target.value)}
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

            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={loading}
              color="white"
              bg="red.500"
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "red.500",
                color: "red.500",
              }}
            >
              パスワードをリセット
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
      >
        <Text
          onClick={() =>
           navigate(`/user-login`) 
          }
          color="red.500"
        >
          ログイン
        </Text>
        <Icon as={BsDot} />
        <Text
          onClick={() =>
           navigate(`/user-register`) 
          }
          color="red.500"
        >
          登録
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
