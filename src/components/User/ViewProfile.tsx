import { Flex, Text, HStack, VStack, Box, Stat, StatLabel, StatNumber, Container, Divider, Avatar, AvatarBadge, Heading, Button, } from '@chakra-ui/react'
import { onSnapshot, collection, limit, query, where, setDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../atoms/currentUserState'
import { firestore } from '../../firebase/clientApp'
import { useParams } from 'react-router-dom'
import SendMessageModel from '../Model/Message/SendMessageModel'
import { sendMessageModelState } from '../../atoms/sendMessageModelState'
import { Message } from '../../types/Message'
import { myMessagesModelState } from '../../atoms/myMessagesModelState'
import ViewMessages from '../Model/Message/ViewMessages'
import { useNavigate } from 'react-router-dom'

import '../homepage.css'

type Connection = {
  id: number,
  user1: string,
  user2: string,
  connected: boolean,
  status: string
}

const ViewProfile: React.FC = () => {
  const navigate = useNavigate()

  const connectionCol = collection(firestore, 'connections')
  const profileCol = collection(firestore, 'userProfiles')
  const messageCol = collection(firestore, 'messages')
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState)
  const [sendMessageState, setSendMessageModelState] = useRecoilState(sendMessageModelState)
  const [myMessages, setMyMessagesModelState] = useRecoilState(myMessagesModelState)
  const [sendRequest, setSendRequest] = useState(false)
  const [connection, setConnection] = useState<Connection>({
    id: 0,
    user1: '',
    user2: '',
    connected: false,
    status: ''
  })
  const [userProfile, setUserProfile] = useState<{
    name: string,
    email: string,
    profileImage: string,
    companyName: string,
    companyProfile: string,
    workProfile: string,
    hobbies: string,
    pet: string,
    pr: string

  }>({
    name: '',
    email: '',
    profileImage: '',
    companyProfile: '',
    companyName: '',
    workProfile: '',
    hobbies: '',
    pr: '',
    pet: ''
  })

  const [fetchingConnection, setFetchingConnection] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  //プロフィール写真をアップデートするために、これを実装してください。
  
  const handleSendRequest = async () => {
    try {
      setSendRequest(true)
      await setDoc(doc(firestore, `connections/connectionId-${currentUser.id}`), {
        connected: false,
        status: "pending",
        user1: currentUser.id,
        user2: id
      })
      setSendRequest(false)

      // create a new notification for receiver of this connection request (user2 => sender)
    } catch (error) {
      console.log("create connection request " + error)
    }
  }

  const handleSendMessage = () => {
    setSendMessageModelState({ open: true })
  }

  const handleSeeMessage = () => {
    const mq = query(messageCol, where("to.id", "==", `${currentUser.id}`))
    try {
      setLoadingMessage(true)
      onSnapshot(mq, snapShot => {
        let data: Message[] = []
        snapShot.forEach((doc) => {
          data.push(doc.data() as Message)
        })
        setLoadingMessage(false)
        setMyMessagesModelState((prev) => ({
          ...prev, messages: data, open: true
        }))
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    const profileQuery = query(profileCol, where("userId", "==", `${id}`), limit(1))
    const unsub = onSnapshot(profileQuery, snapShot => {
      snapShot.forEach((doc) => {
        setUserProfile({
          name: doc.data().name,
          email: doc.data().email,
          profileImage: doc.data().profileImage,
          companyProfile: doc.data().companyProfile,
          companyName: doc.data().companyName,
          hobbies: doc.data().hobbies,
          pr: doc.data().pr,
          pet: doc.data().pet,
          workProfile: doc.data().workProfile
        })
      })
      setLoading(false)
    })

    const q = query(connectionCol, where("user1", "==", `${currentUser.id}`), where("user2", "==", `${id}`), limit(1))
    const q2 = query(connectionCol, where("user1", "==", `${id}`), where("user2", "==", `${currentUser.id}`), limit(1))

    setFetchingConnection(true)
    const unsub2 = onSnapshot(q, snapShot => {
      snapShot.forEach((doc) => {
        setConnection(doc.data() as Connection)
      })
      setFetchingConnection(false)
    })

    setFetchingConnection(true)
    const unsub3 = onSnapshot(q2, snapShot => {
      snapShot.forEach((doc) => {
        setConnection(doc.data() as Connection)
      })
      setFetchingConnection(false)
    })

  }, [firestore, id])


  return (
    <VStack h="full" spacing={0}>
      <Container maxW="2xl" bg="gray.50" mt={6} rounded="md" shadow="md">
        <Flex flexDirection="column" alignItems="start" py={6} w="full" maxW="2xl">
          <Box p={6} w="full" h="full" overflow="auto">
            <Stat mt={6}>
              <StatLabel color="gray.500">Profile of</StatLabel>
              <StatNumber>{userProfile.name}</StatNumber>
            </Stat>
            <Box w="full">
              <Divider color="gray.100" />
            </Box>
            <Flex py={3} flexDirection="column" justifyContent="flex-start">
              <Flex alignItems={'center'}>
                <Avatar onClick={() => alert('hello world')} name={userProfile.name} size="xl" src={userProfile.profileImage}>
                  <AvatarBadge bg="green.500" boxSize={6} borderWidth={4}></AvatarBadge>
                </Avatar> 
                <Button 
                  size={'sm'} 
                  fontSize={'xs'} 
                  ml={3}
                  bg="red.400" 
                  color="white"
                  onClick={() => navigate(`/update-profile/${currentUser.id}`)}
                  >
                    Edit Profile
                  </Button>
              </Flex>             
              <Box w="full" mt={1}>
                <VStack w="full" h="full" spacing={4} overflowY="auto">
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48} >Comapny Name</Heading>
                    {loading ? <Text color="gray.500" fontSize="sm">Loading company name</Text> :
                      <Text flex={1} color="gray.500" fontSize="sm">{userProfile.companyName}</Text>}
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48} >Company Profile</Heading>
                    <Text flex={1} color="gray.500" fontSize="sm">{userProfile.companyProfile}</Text>
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48} >Work profile</Heading>
                    <Text color="gray.500" flex={1} fontSize="sm">{userProfile.workProfile}</Text>
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48} >Hobbies</Heading>
                    <Text color="gray.500" flex={1} fontSize="sm" > {userProfile.hobbies}</Text>
                  </HStack>
                  <HStack w="full" mt={6} alignItems="center">
                    <Heading size="xs" minW={48} w={48} >Pet</Heading>
                    <Text color="gray.500" flex={1} fontSize="sm">{userProfile.pet}</Text>
                  </HStack>
                  <Flex flexDirection="column" w="full" mt={6}>
                    <Heading mb={2} size="xs">PR</Heading>
                    <Text
                      w="full"
                      h="full"
                      fontSize="xs"
                      color="gray.500"
                    >
                      {userProfile.pr}
                    </Text>
                  </Flex>
                </VStack >
                {currentUser.id === id ? <><ViewMessages /> <Button
                  _hover={{
                    bg: "white", border: "1px solid", borderColor: "red.500", color: "red.500"
                  }}
                  fontSize="10pt"
                  fontWeight={700}
                  bg="red.500"
                  color="white"
                  variant='solid'
                  height="36px"
                  width="50%"
                  mt={3}
                  onClick={handleSeeMessage}
                  isLoading={loadingMessage}
                  style={{ boxShadow: '5px 5px'}}
                  className="my__button"
                >See my messages</Button></>
                  :
                  <HStack justifyContent="space-between" mt={4} w="sm">
                    {connection.connected ? <><SendMessageModel id={id as string} /><Button
                      _hover={{
                        bg: "white", border: "1px solid", borderColor: "red.500", color: "red.500"
                      }}
                      type="submit"
                      fontSize="10pt"
                      fontWeight={700}
                      bg="red.500"
                      color="white"
                      variant='solid'
                      height="36px"
                      width="100%"
                      onClick={handleSendMessage}
                      className="my__button"
                    >Send Message</Button></> : <Button
                      _hover={{
                        bg: "white", border: "1px solid", borderColor: "red.500", color: "red.500"
                      }}
                      isLoading={fetchingConnection || sendRequest}
                      type="submit"
                      fontSize="10pt"
                      fontWeight={700}
                      bg="red.500"
                      color="white"
                      variant='solid'
                      height="36px"
                      width="100%"
                      onClick={handleSendRequest}
                      className="my__button"
                    >Send Talk Request</Button>
                    }
                  </HStack>}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container >
    </VStack >
  )
}

export default ViewProfile
