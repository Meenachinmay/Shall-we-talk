import { Flex, Text, HStack, VStack, Box, Center, Stat, StatLabel, StatNumber, Container, Divider, Avatar, AvatarBadge, Heading, Button, Input } from '@chakra-ui/react'
import { collection, doc, onSnapshot, limit, query, setDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../atoms/currentUserState'
import { firestore } from '../../firebase/clientApp'
import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const UpdateProfile: React.FC = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyProfile, setCompanyProfile] = useState('')
  const [workProfile, setworkProfile] = useState('')
  const [hobbies, setHobbies] = useState('')
  const [pet, setPet] = useState('')
  const [pr, setPr] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const toast = useToast()
  const { id } = useParams()
  const profileCol = collection(firestore, 'userProfiles')

  const [userProfile, setUserProfile] = useState<{
    name: string,
    email: string,
    companyName: string,
    companyProfile: string,
    workProfile: string,
    hobbies: string,
    pet: string,
    pr: string,
    profileImage: string
  }>({
    name: '',
    email: '',
    companyProfile: '',
    companyName: '',
    workProfile: '',
    hobbies: '',
    pr: '',
    pet: '',
    profileImage: ''
  })

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true)
      await setDoc(doc(firestore, `userProfiles/userProfileId-${id}`), {
        name: userName || userProfile.name,
        email: email || userProfile.email,
        companyName: companyName || userProfile.companyName,
        companyProfile: companyProfile || userProfile.companyProfile,
        workProfile: workProfile || userProfile.workProfile,
        hobbies: hobbies || userProfile.hobbies,
        pet: pet || userProfile.pet,
        pr: pr || userProfile.pr,
        profileImage: profileImage || userProfile.profileImage,
        userId: id
      })
      setUpdating(false)

      toast({
        title: 'Profile updated',
        description: 'Your profile updated.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const profileQuery = query(profileCol, where("userId", "==", `${id}`), limit(1))
    const unsub = onSnapshot(profileQuery, snapShot => {
      setLoading(true)
      snapShot.forEach((doc) => {
        setUserProfile({
          name: doc.data().name,
          email: doc.data().email,
          companyProfile: doc.data().companyProfile,
          companyName: doc.data().companyName,
          hobbies: doc.data().hobbies,
          pr: doc.data().pr,
          pet: doc.data().pet,
          workProfile: doc.data().workProfile,
          profileImage: doc.data().profileImage
        })
      })
      setLoading(false)
    })

  }, [firestore])

  return (
    <VStack h="full" spacing={0} justifyContent="start">
      <Container maxW="3xl">
        <HStack w="full" maxW="2xl" spacing={6} alignItems="center">
          <Flex flexDirection="column" alignItems="center" py={6} w="full" maxW="2xl">
            <Box p={6} w="full" h="full" overflow="auto">
              <Stat mt={6}>
                <StatLabel color="gray.500">Updating Profile of</StatLabel>
                <StatNumber>{userName}</StatNumber>
              </Stat>
              <Box w="full">
                <Divider color="gray.100" />
              </Box>
              <Flex py={3} flexDirection="column" justifyContent="flex-start">
                <Avatar name="Chinmay anand" size="xl" src='https://cdn-icons-png.flaticon.com/512/6426/6426232.png'>
                  <AvatarBadge bg="green.500" boxSize={6} borderWidth={4} />
                </Avatar>
                <Box w="full" mt={1}>
                  <VStack w="full" h="full" spacing={4} overflowY="auto">
                    <HStack w="full" mt={6} justifyContent="start">
                      <Input
                        name="name"
                        placeholder="Please tell us your name."
                        type="text"
                        mb={2}
                        mt={2}
                        onChange={(e) => setUserName(e.target.value)}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />
                    </HStack>
                    <HStack w="full" mt={6} justifyContent="start">
                      <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        mb={2}
                        mt={2}
                        onChange={(e) => setEmail(e.target.value)}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />
                    </HStack>
                    <HStack w="full" mt={6} justifyContent="start">
                      <Input
                        name="companyName"
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="What is your company name?"
                        type="text"
                        mb={2}
                        mt={2}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />
                    </HStack>
                    <HStack w="full" mt={6} justifyContent="start">
                      <Input
                        name="companyProfile"
                        onChange={(e) => setCompanyProfile(e.target.value)}
                        placeholder="What is your company profile?"
                        type="text"
                        mb={2}
                        mt={2}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />
                    </HStack>
                    <HStack w="full" mt={6} justifyContent="start">
                      <Input
                        name="workProfile"
                        onChange={(e) => setworkProfile(e.target.value)}
                        placeholder="What is your work profile."
                        type="text"
                        mb={2}
                        mt={2}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />
                    </HStack>
                    <HStack w="full" mt={6} justifyContent="start">
                      <Input
                        name="hobbies"
                        onChange={(e) => setHobbies(e.target.value)}
                        placeholder="Tell us your hobbies."
                        type="text"
                        mb={2}
                        mt={2}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />
                    </HStack>
                    <HStack w="full" mt={6} justifyContent="start">
                      <Input
                        name="pet"
                        onChange={(e) => setPet(e.target.value)}
                        placeholder="Write about your pet."
                        type="text"
                        mb={2}
                        mt={2}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />
                    </HStack>

                    <Flex flexDirection="column" w="full" mt={6}>
                      <Input
                        name="pr"
                        onChange={(e) => setPr(e.target.value)}
                        placeholder="Write few words about yourself."
                        type="text"
                        mb={2}
                        mt={2}
                        fontSize="10pt"
                        _placeholder={{ color: "gray.500" }}
                        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
                        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500" }} bg="gray.50" />

                    </Flex>
                  </VStack >
                  <HStack justifyContent="center" mt={4} w="xs">
                    <Button
                      isLoading={updating}
                      _hover={{
                        bg: "white", border: "1px solid", borderColor: "blue.500", color: "blue.500"
                      }}
                      onClick={handleUpdateProfile}
                      fontSize="10pt"
                      fontWeight={700}
                      bg="blue.500"
                      borderRadius={"60px"}
                      color="white"
                      variant='solid'
                      height="36px"
                      width="100%"
                    >Update profile</Button>
                  </HStack>
                </Box>
              </Flex>
            </Box>
          </Flex> 
        </HStack>
      </Container >
    </VStack >
  )
}

export default UpdateProfile
