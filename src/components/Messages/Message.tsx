import { Box, Text, Flex, VStack } from '@chakra-ui/react'
import React from 'react'

type Props = {
  name: string,
  text: string
}

const Message: React.FunctionComponent<Props> = ({ name, text }) => {
  return (
    <Flex justifyItems="flex-start" w="full" maxH="xl" minH="xl" flexDirection="column">
      <Box bg="gray.100" p={2} rounded="md">
        <Text fontSize="xs" fontWeight="semibold">{name}</Text>
        <Text fontSize="sm" color="gray.500">{text}</Text>
      </Box>
    </Flex>
  )
}

export default Message
