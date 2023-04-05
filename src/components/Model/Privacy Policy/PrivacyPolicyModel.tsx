import React, { useEffect, useState } from "react";
import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { privacyPolicyModelState } from "../../../atoms/privacyPolicyModelState";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/clientApp";

const PrivacyPolicyModel: React.FC = () => {
  const [privacyPolicyModel, setPrivacyPolicyModelState] = useRecoilState(
    privacyPolicyModelState
  );
  const [url1, setURL1] = useState("");
  const [url2, setURL2] = useState("");

  const handleClose = () => {
    setPrivacyPolicyModelState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    getDownloadURL(ref(storage, "swtプライバシーポリシー.pdf")).then(
      (url) => {
        setURL1(url);
      }
    );

    getDownloadURL(ref(storage, "swt利用規約.pdf")).then((url) => {
      setURL2(url);
    });
  });

  return (
    <>
      <Modal isOpen={privacyPolicyModel.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg={"red.50"}>
          <ModalHeader textAlign="center">
            <VStack>
              <Text fontSize={"12pt"}>Shall We Talkプライバシーポリシー</Text>
              <Text color="gray.400" fontSize="xs" textOverflow="hidden"></Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            minH={"150px"}
            display="flex"
            flexDirection="column"
            overflowY={"scroll"}
          >
            <>
              <Flex
                direction={"column"}
                justifyContent="center"
                alignItems={"center"}
              >
                <Text mb={10}>
                  SWTの利用規約とプライバシーポリシーはこちらから確認できます。
                </Text>
                <Flex>
                  <a href={url1} target="_blank" rel="noreferrer">
                    <Button
                      size={"sm"}
                      mr={5}
                      bg="red.500"
                      color={"white"}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "red.500",
                        color: "red.500",
                      }}
                    >
                      プライバシーポリシー
                    </Button>
                  </a>
                  <a href={url2} target="_blank" rel="noreferrer">
                    <Button
                      size="sm"
                      bg="red.500"
                      color={"white"}
                      _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "red.500",
                        color: "red.500",
                      }}
                    >
                      利用規約
                    </Button>
                  </a>
                </Flex>
              </Flex>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrivacyPolicyModel;
