import { Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, VStack } from '@chakra-ui/react'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState } from '../../../atoms/currentUserState'
import { userStatusModelState } from '../../../atoms/userStatusModelState'
import { firestore } from '../../../firebase/clientApp'
import LoadingSpinner from '../../customUIComponents/LoadingSpinner'

const StatusModel: React.FC = () => {
  const [modelState, setModelState] = useRecoilState(userStatusModelState)
  const currentUser = useRecoilValue(currentUserState)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false
    }))
  }

  const handleStatusChange = async (status: string) => {
    try {
      setLoading(true)
      const userDoc = doc(firestore, `vs-users/userId-${currentUser.id}`)
      await updateDoc(userDoc, {
        status: status
      })
      setLoading(false)
    } catch (error) {
    }
  }

  return (
    <>
      <Modal isOpen={modelState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            <VStack>
              <Text>
                Change your status here
              </Text>
              <Text color="gray.400" fontSize="xs" textOverflow="hidden">
                Based upon your talk status other will be able to send you request and messages.
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6} >
            <VStack align="center" justify="center" width="70%" spacing={1}>
              {loading ? <LoadingSpinner /> :
                <>
                  <Button isLoading={loading} onClick={() => handleStatusChange("want_to_talk")} size="xs" bg="green.100" color="green.800" _hover={{ bg: "green.100", color: "green.700" }}>Want to talk</Button>
                  <Button isLoading={loading} onClick={() => handleStatusChange("do_not_want_to_talk")} size="xs" bg="red.100" color="red.800" _hover={{ bg: "red.100", color: "red.700" }}>Do Want to talk</Button>
                  <Button isLoading={loading} onClick={() => handleStatusChange("lets_talk")} size="xs" bg="blue.100" color="blue.800" _hover={{ bg: "blue.100", color: "blue.700" }}>Let's talk</Button>
                </>
              }
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default StatusModel
