import React from 'react'
import { Stat, StatLabel, IconButton, StatNumber, Input, Flex, HStack } from '@chakra-ui/react'
import { IoSend } from 'react-icons/io5'
import { HiChat } from 'react-icons/hi'

import ChatBubble from './ChatBubble'

type Props = {
  onChatHistoryOpen: () => void
}

const messages = [
  {
    message: "チンメイこんにちは。今日はオンライン会議をお願いできますでしょうか？",
    from: "others",
    dataSent: "20:21"
  },
  {
    message: "はい、でも会議時間は午後５時から午後８時までの時間でしたら、私ができると思います。お願いします",
    from: "me",
    dataSent: "20:34"
  },
  {
    message: "はい、わかりました。それでは、そうしましょう。",
    from: "others",
    dataSent: "20:36"
  },
  {
    message: "チンメイこんにちは。今日はオンライン会議をお願いできますでしょうか？",
    from: "others",
    dataSent: "20:21"
  },
  {
    message: "はい、でも会議時間は午後５時から午後８時までの時間でしたら、私ができると思います。お願いします",
    from: "me",
    dataSent: "20:34"
  },
  {
    message: "はい、わかりました。それでは、そうしましょう。",
    from: "others",
    dataSent: "20:36"
  }

]

const Chat: React.FC<Props> = ({ onChatHistoryOpen }: Props) => {
  return (
    <Flex
      w="full" flexDirection="column"
    >
      <HStack px={4} py={4} borderBottomColor="gray.100" borderBottomWidth={1}>
        <IconButton aria-label="Toggle Chat History" icon={<HiChat />} display={{ base: "inherit", lg: "none" }} onClick={onChatHistoryOpen} />
        <Input variant="filled" rounded="full" placeholder="Search friends" />
      </HStack>
      <Flex px={6} overflow="auto" flexDirection="column" flex={1}>
        <Stat mt={6}>
          <StatLabel color="gray.500">Chatting with</StatLabel>
          <StatNumber>Ayumu Oshiro</StatNumber>
        </Stat>
        {messages.map(({ message, from, dataSent }, index) => (
          <ChatBubble key={index} message={message} from={from} dateSent={dataSent} />
        ))}
      </Flex>
      <Flex pl={4} pr={2} py={2} borderTopColor="gray.100" borderTopWidth={1}>
        <Input variant="unstyled" placeholder="Type your message" />
        <IconButton
          colorScheme="blue"
          aria-label="Send message"
          variant="ghost"
          icon={<IoSend />}
        />
      </Flex>
    </Flex >
  )
}

export default Chat
