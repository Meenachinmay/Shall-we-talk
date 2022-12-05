import { HStack, Flex, useDisclosure } from '@chakra-ui/react'
import Chat from './components/Chat'
import ChatHistory from './components/ChatHistory'
import ChatHistoryDrawer from './components/Drawers/ChatHistoryDrawer'
import Navigation from './components/Navigation'
import RecipientDetail from './components/RecipientDetail'

const Index: React.FC = () => {
  const { isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose
  } = useDisclosure()

  return (
    <HStack h="100vh" spacing={0}>
      <Flex h="full" as="nav" maxW={16} w="full" bg="gray.100">
        <Navigation />
      </Flex>
      <Flex h="full" as="aside" maxW={{ base: "xs", xl: "sm" }} display={{ base: 'none', lg: 'flex' }} w="full" borderRightColor="gray.100" borderRightWidth={1} p={8}>
        <ChatHistory />
      </Flex>
      <Flex h="full" as="main" flex={1} borderRightColor="gray.100" borderRightWidth={1}>
        <Chat onChatHistoryOpen={onChatHistoryOpen} />
      </Flex>
      <Flex as="aside" h="full" maxW={{ base: "xs", xl: "sm" }} display={{ base: 'none', lg: 'flex' }} w="full">
        <RecipientDetail />
      </Flex>
      <ChatHistoryDrawer isOpen={isChatHistoryOpen} onClose={onChatHistoryClose} />
    </HStack>
  )
}

export default Index
