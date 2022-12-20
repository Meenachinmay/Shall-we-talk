import React, { useState } from "react";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot, BsScissors, BsBellFill } from "react-icons/bs";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModelState } from '../../../atoms/authModelState'

const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModelState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //await sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={BsBellFill} color="brand.100" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4}>Check your email :)</Text>
      ) : (
        <>
          <Text color="red.500" fontSize="sm" textAlign="center" mb={2}>
            Enter the email associated with your account and we will send you a
            reset link
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
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
                bg:"white",
                border: "1px solid",
                borderColor: "red.500",
                color: "red.500"
              }}
            >
              Reset Password
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
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
          color= "red.500"
        >
          LOGIN
        </Text>
        <Icon as={BsDot} />
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
          color="red.500"
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;