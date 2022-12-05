import { Flex, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Container, Box, Stat, StatLabel, StatNumber, Avatar, Divider, AvatarBadge, HStack, Heading, Button } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { profileModelState } from '../../../atoms/userProfileModelState'
import { userProfileState } from '../../../atoms/userProfileState'
import LoadingSpinner from '../../customUIComponents/LoadingSpinner'

const ProfileModel: React.FC = () => {
  const [modelState, setModelState] = useRecoilState(profileModelState)
  const [profileState, setUserProfileState] = useRecoilState(userProfileState)

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false,
      loadingProfileInModel: false
    }))
  }

  return (
    <>
      <Modal isOpen={modelState.open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack h="full" spacing={0} justifyContent="start">
              <Container maxW="2xl">
              {modelState.loadingProfileInModel ? <LoadingSpinner /> : 
                <Flex flexDirection="column" alignItems="center" py={6} w="full" maxW="2xl">
                  <Box p={6} w="full" h="full" overflow="auto">
                    <Stat mt={6}>
                      <StatLabel color="gray.500">Profile of</StatLabel>
                      <StatNumber>{profileState.name}</StatNumber>
                    </Stat>
                    <Box w="full">
                      <Divider color="gray.100" />
                    </Box>
                    <Flex py={3} flexDirection="column" justifyContent="flex-start">
                      <Avatar name={`${profileState.name}`} size="xl" src='https://cdn-icons-png.flaticon.com/512/6426/6426232.png'>
                        <AvatarBadge bg="green.500" boxSize={6} borderWidth={4}></AvatarBadge>
                      </Avatar>
                      <Box w="full" mt={1}>
                        <VStack w="full" h="full" spacing={4} overflowY="auto">
                          <HStack w="full" mt={6} justifyContent="start">
                            <Heading size="xs" fontSize="xs">Company Name</Heading>
                            <Text color="gray.500" fontSize="xs">{profileState.companyName}</Text>
                          </HStack>
                          <HStack w="full" mt={6} justifyContent="start">
                            <Heading size="xs" fontSize="xs">Company Profile</Heading>
                            <Text color="gray.500" fontSize="xs">{profileState.companyProfile}</Text>
                          </HStack>
                          <HStack w="full" mt={6} justifyContent="start">
                            <Heading size="xs" fontSize="xs">Work profile</Heading>
                            <Text color="gray.500" fontSize="xs">{profileState.workProfile}</Text>
                          </HStack>
                          <Flex flexDirection="column" w="full" mt={6}>
                            <Heading mb={2} size="xs" fontSize="xs">PR</Heading>
                            <Text
                              w="full"
                              h="full"
                              fontSize="xs"
                              color="gray.500"
                            >
                              {profileState.pr}
                            </Text>
                          </Flex>
                        </VStack >
                        <HStack justifyContent="space-between" mt={4} w="sm">
                          <Button
                            _hover={{
                              bg: "white", border: "1px solid", borderColor: "blue.500", color: "blue.500"
                            }}
                            type="submit"
                            fontSize="10pt"
                            fontWeight={700}
                            bg="blue.500"
                            borderRadius={"60px"}
                            color="white"
                            variant='solid'
                            height="36px"
                            width="100%"
                          >Send Talk Request</Button>
                          <Button
                            _hover={{
                              bg: "white", border: "1px solid", borderColor: "blue.500", color: "blue.500"
                            }}
                            type="submit"
                            fontSize="10pt"
                            fontWeight={700}
                            bg="blue.500"
                            borderRadius={"60px"}
                            color="white"
                            variant='solid'
                            height="36px"
                            width="100%"
                          >Send Message</Button>
                        </HStack>
                      </Box>
                    </Flex>
                  </Box>
                </Flex> }
              </Container >
            </VStack >
          </ModalBody>
        </ModalContent>
      </Modal >
    </>
  )
}

export default ProfileModel
