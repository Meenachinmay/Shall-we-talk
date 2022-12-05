import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { authModelState } from '../../../atoms/authModelState'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { auth, firestore } from '../../../firebase/clientApp'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { currentUserState } from '../../../atoms/currentUserState'
import { deleteDoc, doc } from 'firebase/firestore'

const AuthModelButtons: React.FC = () => {
  const setAuthModelState = useSetRecoilState(authModelState)
  const [loading, setLoading] = useState(false)
  const [logout, setLogout] = useState(false)
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState)

  /*useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setLogout(false)
      } else {
        setLogout(true)
      }
    })
  }, [auth])
  
  const handleLogout = () => {
    setLoading(true)
    const userDoc = doc(firestore, `users/userId-${currentUser.id}`)
    deleteDoc(userDoc)
    signOut(auth)
    setCurrentUserState((prev) => ({
      ...prev, id: '', status: '', online: '', email: ''
    }))
    setLoading(false)
  }
  
  if (!logout) {
    return (
      <Button
        isLoading={loading}
        _hover={{
          bg: "white", border: "1px solid", borderColor: "blue.500", color: "blue.500"
        }}
        fontSize="10pt"
        fontWeight={700}
        bg="blue.500"
        borderRadius={"60px"}
        color="white"
        onClick={handleLogout}
        variant='outline'
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}>Logout</Button>
    )
  }*/

  return (
    <>
      <Button _hover={{
        bg: "white", border: "1px solid", borderColor: "red.500", color: "red.500"
      }}
        fontSize="10pt"
        fontWeight={700}
        bg="red.500"
        borderRadius={"60px"}
        color="white"
        onClick={() => setAuthModelState({ open: true, view: "login" })}
        variant='outline'
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}>Log In</Button>
      <Button _hover={{
        bg: "red.100", border: "1px solid", borderColor: "red.500", color: "red.500"
      }}
        fontSize="10pt"
        fontWeight={700}
        bg="red.500"
        borderRadius={"60px"}
        border="1px solid"
        borderColor="red.500"
        color="white"
        onClick={() => setAuthModelState({ open: true, view: "signup" })}
        variant='outline'
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
      >Sign Up</Button>
    </>
  )
}
export default AuthModelButtons
