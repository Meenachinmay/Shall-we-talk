import { Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { authModelState } from '../../../atoms/authModelState'
import AuthInputs from './AuthInputs'
import ResetPassword from './ResetPassword'

const AuthModel: React.FC = () => {
  const [modelState, setModelState] = useRecoilState(authModelState)

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false
    }))
  }

  return (
    <>
      <Modal size={{ base: "xs", sm: "md", md: "lg"}} isOpen={modelState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="red.50">
          <ModalHeader textAlign='center'>
            {modelState.view === 'login' && 'ログイン'}
            {modelState.view === 'signup' && 'ユーザー登録'}
            {modelState.view === 'resetPassword' && ''}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Flex direction="column" align="center" justify="center" width={{ base: "100%", sm: "90%", md: "80%", lg: "70%"}}>
              {modelState.view === 'login' || modelState.view === 'signup' ? <>
                <AuthInputs />
              </> : <ResetPassword />}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModel
