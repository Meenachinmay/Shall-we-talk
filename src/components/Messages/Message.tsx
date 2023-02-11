import { Box, Text, Flex, VStack } from '@chakra-ui/react'
import React from 'react'

type Props = {
  name: string,
  text: string
}

const Message: React.FunctionComponent<Props> = ({ name, text }) => {
  return (
    <Flex  w="full" pb={3} flexDirection="column" textOverflow={'hidden'}>
      <Box bg="gray.100" p={2} rounded="md">
        <Text fontSize="xs" fontWeight="semibold">{name}</Text>
        <Text fontSize="sm" color="gray.500" textOverflow={'ellipsis'}>{text}</Text>
      </Box>
    </Flex>
  )
}

export default Message
