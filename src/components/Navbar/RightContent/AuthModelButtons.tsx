import React from "react";
import { Button } from "@chakra-ui/react";
import { authModelState } from "../../../atoms/authModelState";
import { useSetRecoilState } from "recoil";
import "../../homepage.css";
import { useNavigate } from "react-router-dom";

const AuthModelButtons: React.FC = () => {
  const setAuthModelState = useSetRecoilState(authModelState);
  const navigate = useNavigate()

  function handleLoginButton () {
    navigate('/user-login')
  }

  function handleRegisterButton () {
    navigate('/user-register')
  }

  return (
    <>
      <Button
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "red.500",
          color: "red.500",
        }}
        fontSize={{ base: "6pt", sm: "8pt", md: "8pt"}}
        fontWeight={700}
        bg="red.500"
        color="white"
        onClick={() => handleLoginButton()}
        variant="outline"
        height="28px"
        display={{ base: "flex", sm: "flex" }}
        width={{ base: "60px",sm: "80px", md: "110px" }}
        mr={2}
        className="my__button"
      >
        ログイン
      </Button>
      <Button
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "red.500",
          color: "red.500",
        }}
        fontSize={{ base: "6pt", sm: "8pt", md: "8pt"}}
        fontWeight={700}
        bg="red.500"
        border="1px solid"
        borderColor="red.500"
        color="white"
        onClick={() => handleRegisterButton()}
        variant="outline"
        height="28px"
        display={{ base: "flex", sm: "flex" }}
        width={{ base: "60px",sm: "80px", md: "110px" }}
        className="my__button"
      >
        ユーザー登録
      </Button>
    </>
  );
};
export default AuthModelButtons;
