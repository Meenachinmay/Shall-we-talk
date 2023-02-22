import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../../atoms/currentUserState";
import { userStatusModelState } from "../../../atoms/userStatusModelState";
import { firestore } from "../../firebase/clientApp";
import LoadingSpinner from "../../customUIComponents/LoadingSpinner";

const StatusModel: React.FC = () => {
  const [modelState, setModelState] = useRecoilState(userStatusModelState);
  const currentUser = useRecoilValue(currentUserState);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleStatusChange = async (status: string) => {
    try {
      setLoading(true);
      const userDoc = doc(firestore, `vs-users/userId-${currentUser.id}`);
      await updateDoc(userDoc, {
        status: status,
      });
      setLoading(false);
    } catch (error) {}
  };

  return (
    <>
      <Modal isOpen={modelState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack>
              <Text>トークステータスの変更</Text>
              <Text color="gray.400" fontSize="xs" textOverflow="hidden">
                このトークステータスより他のユーザーはあなたが会話可能かどうか判断します。作業中の場合は「話しかけNG」にセットしてください。
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <VStack align="center" justify="center" width="70%" spacing={1}>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Button
                    isLoading={loading}
                    onClick={() => handleStatusChange("want_to_talk")}
                    size="xs"
                    width={"90px"}
                    style={{ fontSize: "10px" }}
                    bg="green.100"
                    color="green.800"
                    _hover={{ bg: "green.100", color: "green.700" }}
                  >
                    話し相手探し中
                  </Button>
                  <Button
                    isLoading={loading}
                    onClick={() => handleStatusChange("do_not_want_to_talk")}
                    size="xs"
                    width={"90px"}
                    style={{ fontSize: "10px" }}
                    bg="red.100"
                    color="red.800"
                    _hover={{ bg: "red.100", color: "red.700" }}
                  >
                    話しかけNG
                  </Button>
                  <Button
                    isLoading={loading}
                    onClick={() => handleStatusChange("lets_talk")}
                    size="xs"
                    width={"90px"}
                    style={{ fontSize: "10px" }}
                    bg="blue.100"
                    color="blue.800"
                    _hover={{ bg: "blue.100", color: "blue.700" }}
                  >
                    話しかけOK
                  </Button>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StatusModel;
