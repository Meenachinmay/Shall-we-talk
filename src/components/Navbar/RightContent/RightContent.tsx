import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NotificationsDrawer from "../../Drawers/NotificationsDrawer";
import AuthModel from "../../Model/Auth/AuthModel";
import AuthModelButtons from "./AuthModelButtons";
import { auth, firestore } from "../../../firebase/clientApp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { deleteDoc, doc } from "firebase/firestore";
import { currentUserState } from "../../../atoms/currentUserState";
import { currentUserProfileState } from "../../../atoms/currentUserProfileState";
import { useNavigate } from 'react-router-dom'
import '../../homepage.css'

const RightContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile] = useRecoilState(currentUserProfileState);
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogout(false);
      } else {
        setLogout(true);
      }
    });
  }, [auth, firestore]);

  const handleLogout = async () => {
    setLoading(true);
    await deleteDoc(doc(firestore, "vs-users", `userId-${currentUser.id}`));
    signOut(auth);
    setCurrentUserState((prev) => ({
      ...prev,
      id: "",
      status: "",
      online: "",
      email: "",
    }));
    setLoading(false);
  };

  const handleUserNameClick = () => {
    navigate(`/profile/${currentUser.id}`) 
  }

  return (
    <>
      <AuthModel />
      <NotificationsDrawer />
      <Flex justify="center" align="center">
        {!logout ? (
          <>
            <Text fontSize="xs" size="xs" mr={2} cursor="pointer" onClick={handleUserNameClick}>{currentUserProfile.name}</Text>
            <Button
              isLoading={loading}
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "red.500",
                color: "red.500",
              }}
              fontSize="10pt"
              fontWeight={700}
              bg="red.500"
              color="white"
              onClick={handleLogout}
              variant="outline"
              height="28px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              mr={2}
              className="my__button"
            >
              Logout
            </Button>
          </>
        ) : (
          <AuthModelButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;