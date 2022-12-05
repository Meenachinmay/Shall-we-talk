import { Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, VStack, Flex, Input, IconButton, Textarea } from '@chakra-ui/react'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserProfileState } from '../../../atoms/currentUserProfileState'
import { currentUserState } from '../../../atoms/currentUserState'
import { sendMessageModelState } from '../../../atoms/sendMessageModelState'
import { firestore } from '../../../firebase/clientApp'

type Props = {
  id: string
}

const SendMessageModel: React.FC<Props> = ({ id }) => {
  const [modelState, setModelState] = useRecoilState(sendMessageModelState)
  const currentUser = useRecoilValue(currentUserState)
  const currentUserProfile = useRecoilValue(currentUserProfileState)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>('')

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false
    }))
  }

  const handleSendMessage = async () => {
    try {
      setLoading(true)
      await setDoc(doc(firestore, `messages/messageId-${currentUser.id}`), {
        text: message,
        from: {
          id: currentUser.id,
          name: currentUserProfile.name
        },
        to: {
          id: id,
        },
        seen: false
      })
      setLoading(false)
      setMessage('')
      setModelState({ open: false })
      // trigger notification
    } catch (error) {
      console.log("sending message model error :" + error)
    }
  }

  return (
    <>
      <Modal size="lg" isOpen={modelState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            <VStack>
              <Text>
                Send message
              </Text>
              <Text color="gray.400" fontSize="xs" textOverflow="hidden">
                Here you can send a short message to express your interest to talk.
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6} >
            <Flex width="md" alignItems="center">
              <Textarea fontSize="sm" mr={2} onChange={(e) => setMessage(e.target.value)} variant="unstyled" border="1px solid" w="full" px={3} placeholder="Type your message" />
              <IconButton
                colorScheme="blue"
                aria-label="Send message"
                variant="ghost"
                icon={<IoSend />}
                onClick={handleSendMessage}
                isLoading={loading}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SendMessageModel
