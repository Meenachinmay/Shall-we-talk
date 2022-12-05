import { VStack, Flex, Avatar, AvatarBadge, Heading, Text, HStack, IconButton, Box, Divider, Input, List, ListItem } from '@chakra-ui/react'
import { RiTwitterFill, RiYoutubeFill } from 'react-icons/ri'
import ChatRow from './ChatRow'

const onlineFriends = [
  "Mahima", "Ekta", "Lalu"
]

const ChatHistory = () => {
  return (
    <VStack spacing={3} h="full" w="full" alignItems="center">
      <Flex w="full" flexDirection="column" alignItems="center" justifyContent="flex-start">
        <Avatar name="Chinmay anand" size="xl" src='https://cdn-icons-png.flaticon.com/512/6426/6426232.png'>
          <AvatarBadge bg="green.500" boxSize={6} borderWidth={4}></AvatarBadge>
        </Avatar>
        <VStack>
          <Heading size="sm" mt={{ base: 0, lg: 3 }}>
            Chinmay anand
          </Heading>
          <HStack spacing={2} px={8} mt={3} justifyContent="center">
            <IconButton
              aria-label="Twitter"
              icon={<RiTwitterFill />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              _hover={{ color: "blue.500" }}
              h={10}
            />
            <IconButton
              aria-label="Youtube"
              icon={<RiYoutubeFill />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              _hover={{ color: 'red.500' }}
              h={10}
            />
          </HStack>
        </VStack>
      </Flex>

      <Box px={8} w="full">
        <Divider color="gray.100" />
      </Box>

      <HStack px={8} w="full" justifyContent="space-between" >
        <Heading size="xs">Friends online</Heading>
        <Text fontSize="sm" color="gray.500" fontWeight="semibold">23</Text>
      </HStack>

      <HStack overflowX="auto" minH={24} px={8} w="full" spacing={3} justifyContent="flex-start">
        {onlineFriends.map((friend) => (
          <Avatar name={friend} key={friend} />
        ))}
      </HStack>

      <Box px={8} w="full">
        <Divider color="gray.100" />
      </Box>
      <Box px={8} w="full" >
        <Heading size="sm" w="full">Chats</Heading>
        <Input variant="filled" mt={2} minH={10} rounded="full" placeholder="Search chat..." />
      </Box>

      <Box w="full" overflowY="auto">
        <List w="full" spacing={0}>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
        </List>
      </Box>
    </VStack >
  )
}

export default ChatHistory
