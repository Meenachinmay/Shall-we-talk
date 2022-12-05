import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { authModelState } from '../../../atoms/authModelState'
import Login from './Login'
import SignUp from './SignUp'

const AuthInputs: React.FC = () => {
  const ModelState = useRecoilValue(authModelState)

  return (
    <Flex>
      {ModelState.view === 'login' && <Login />}
      {ModelState.view === 'signup' && <SignUp />}
    </Flex>
  )
}

export default AuthInputs
