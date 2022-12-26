import { Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { NotificationType } from '../../types/NotificationType'

type Props = {
  type: string,
  seen: boolean,
  message: string
}

const NotificationCard: React.FC<Props> = ({ type, seen, message }) => {
  let notificationMessage: string = ''

  if (type === 'request_accepted') {
    notificationMessage = 'Someone accepted your talk request, click here to see.'
  }
  else if (type === 'request_rejected') {
    notificationMessage = 'You have a rejection for your recent talk request.'
  } else if (type === 'new_request') {
    notificationMessage = 'A new request arrived for you. Click here to see the requets.'
  } else {

  }

  let bgColor: string = ''
  if (seen) {
    bgColor = 'green.100'
  } else {
    bgColor = 'red.100'
  }

  const handleSeenNotification = () => {

  }

  return (
    <>
      <Box mb={3} cursor="pointer" onClick={() => alert('seen')} p={3} alignItems="center" h="50pt" bg={bgColor} rounded="md">
        <Flex flexDirection="column">
          <Text fontSize="sm" noOfLines={1} fontWeight="bold" cursor="pointer">{message}</Text>
          <Text fontSize="xs" noOfLines={1} color="gray.700">{notificationMessage}</Text>
        </Flex>
      </Box>
    </>
  )
}

export default NotificationCard