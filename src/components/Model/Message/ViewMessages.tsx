import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { myMessagesModelState } from "../../../atoms/myMessagesModelState";
import Message from "../../Messages/Message";

const ViewMessagesModel: React.FC = () => {
  const [myMessages, setMyMessagesModelState] =
    useRecoilState(myMessagesModelState);

  const handleClose = () => {
    setMyMessagesModelState((prev) => ({
      ...prev,
      messages: [],
      open: false,
    }));
  }; 

  return (
    <>
      <Modal isOpen={myMessages.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg={'red.50'}>
          <ModalHeader textAlign="center">
            <VStack>
              <Text>メッセージ</Text>
              <Text color="gray.400" fontSize="xs" textOverflow="hidden">
                他のユーザーからの最新のメッセージが順に表示されます。
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            minH={"lg"}
            maxH={"lg"}
            display="flex"
            flexDirection="column"
            overflowY={'scroll'}
          >
            {myMessages.messages.map((message) => (
              <Message
                key={message.id}
                name={message.from.name}
                text={message.text}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewMessagesModel;
