import {
    Button, Drawer,
    DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader,
    DrawerOverlay, Flex, IconButton, Tooltip, useDisclosure
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    getDocs, query,
    where
} from "firebase/firestore";
import { useRef, useState } from "react";
import { HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserLogoutState } from "../../atoms/currentUserLogoutState";
import { currentUserProfileState } from "../../atoms/currentUserProfileState";
import { currentUserState } from "../../atoms/currentUserState";
import { loaderModelState } from "../../atoms/loaderModelState";
import { userStatusModelState } from "../../atoms/userStatusModelState";
import { auth, firestore } from "../firebase/clientApp";

const UserMenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef().current;
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const [userLogout, setCurrentUserLogoutState] = useRecoilState(
    currentUserLogoutState
  );
  const messageCol = collection(firestore, "messages");
  const navigate = useNavigate();
  const setUserStatusModelState = useSetRecoilState(userStatusModelState);
  const [loaderModel, setLoaderModelState] = useRecoilState(loaderModelState);

  const handleLogout = async () => {
    setLoading(true);
    setLoaderModelState({ open: true });
    await deleteDoc(doc(firestore, "vs-users", `userId-${currentUser.id}`));
    setCurrentUserState((prev) => ({
      ...prev,
      id: "",
      status: "",
      online: "",
      email: "",
    }));
    setCurrentUserProfileState((prev) => ({
      ...prev,
      id: "",
      name: "",
      status: "",
      profileImage: "",
      companyName: "",
      companyProfile: "",
      workProfile: "",
      pr: "",
      pet: "",
      hobbies: "",
    }));
    setCurrentUserLogoutState((prev) => ({
      ...prev,
      currentUserLoggedOut: true,
    }));

    // delete all the messages here
    const mq = query(messageCol, where("to.id", "==", `${currentUser.id}`));
    const querySnapshot = await getDocs(mq);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    setLoading(false);
    signOut(auth);
    localStorage.removeItem("recoil-persist");
    setLoaderModelState({ open: false });
  };

  const handleUserNameClick = () => {
    navigate(`/profile/${currentUser.id}`);
  };

  return (
    <>
      <Tooltip label="User options" placement="bottom">
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          color="red.500"
          icon={<HiUser />}
          mr={2}
          ml={2}
          size="sm"
          display={{ base: "flex", sm: "inherit" }}
          aria-label="User"
        />
      </Tooltip>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{currentUserProfile.name}</DrawerHeader>
          <DrawerBody>
            <>
              <Flex alignItems='center' flexDir={'column'} gap={'10px'} justifyContent='space-between'>
                <Button
                  onClick={() => handleUserNameClick()}
                  bg="red.500"
                  color="white"
                  _hover={{
                    bg: "white",
                    color: "red.500",
                    border: "1px solid",
                  }}
                  size={{ base: "xxs", sm: "xxs", md: "xs", lg: "xs" }}
                  p={1}
                  width={"50%"}
                  style={{ fontSize: "9px" }}
                >
                  プロフィールへ
                </Button>
                <Button
                  onClick={() => navigate(`/dashboard/${currentUser.spaceId}`)}
                  bg="red.500"
                  color="white"
                  _hover={{
                    bg: "white",
                    color: "red.500",
                    border: "1px solid",
                  }}
                  size={{ base: "xxs", sm: "xxs", md: "xs", lg: "xs" }}
                  p={1}
                  width={"50%"}
                  style={{ fontSize: "9px" }}
                >
                  バーチャルスペース
                </Button>
                <Button
                  onClick={() => handleLogout()}
                  bg="red.500"
                  color="white"
                  _hover={{
                    bg: "white",
                    color: "red.500",
                    border: "1px solid",
                  }}
                  size={{ base: "xxs", sm: "xxs", md: "xs", lg: "xs" }}
                  p={1}
                  width={"50%"}
                  style={{ fontSize: "9px" }}
                >
                  {loading ? "ログアウト中" : "ログアウト"}
                </Button>
              </Flex>
            </>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserMenuDrawer;