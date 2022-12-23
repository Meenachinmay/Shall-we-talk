import { Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, VStack, Flex } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { myMessagesModelState } from '../../../atoms/myMessagesModelState'
import Message from '../../Messages/Message'

const ViewMessagesModel: React.FC = () => {
  const [myMessages, setMyMessagesModelState] = useRecoilState(myMessagesModelState)

  const handleClose = () => {
    setMyMessagesModelState((prev) => ({
      ...prev,
      open: false
    }))
  }

  return (
    <>
      <Modal isOpen={myMessages.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            <VStack>
              <Text>
                Your messages
              </Text>
              <Text color="gray.400" fontSize="xs" textOverflow="hidden">
                A latest message from any user will be shown here.
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={'xl'} maxH={'xl'} display="flex" flexDirection="column">
            {myMessages.messages.map((message) => (
              <Message key={message.id} name={message.from.name} text={message.text} />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ViewMessagesModel
