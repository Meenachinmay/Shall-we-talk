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
import { useNavigate } from "react-router-dom";

import "../../homepage.css";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const RightContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile] = useRecoilState(currentUserProfileState);
  const navigate = useNavigate();

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
    navigate(`/profile/${currentUser.id}`);
  };

  return (
    <>
      <AuthModel />
      <Flex justify="center" align="center">
        <NotificationsDrawer />
        {!logout ? (
          <>
            <Menu>
              <MenuButton
                bg="red.500"
                border="1px solid"
                color="white"
                borderColor="white"
                size="xs"
                mr={1}
                as={Button}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "red.500",
                  color: "red.500",
                }}
                fontSize="10pt"
                fontWeight={700}
                className="my__button"
                style={{ outline: "none" }}
              >
                {currentUserProfile.name}
              </MenuButton>
              <MenuList p={2}>
                <MenuItem
                  size="xs"
                  mt={2}
                  fontSize="10pt"
                  fontWeight={700}
                  onClick={handleUserNameClick}
                  as={Button}
                  className="my__button"
                  style={{ outline: "none" }}
                >
                  Go to profile
                </MenuItem>
                <MenuItem
                  size="xs"
                  mt={2}
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
                  onClick={() => navigate("/dashboard")}
                  as={Button}
                  className="my__button"
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  size="xs"
                  mt={2}
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
                  as={Button}
                  className="my__button"
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <AuthModelButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
