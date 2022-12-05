import { Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { NotificationType } from '../../types/NotificationType'

type Props = {
  sender: string,
  receiver: string,
  type: string,
  seen: boolean
}

const NotificationCard: React.FC<Props> = ({ sender, type, seen, receiver }) => {
  let notificationMessage: string = ''

  if (type === 'request_accept') {
    notificationMessage = 'Accepted your talk request. Click here to send a message.'
  }
  else if (type === 'request_reject') {
    notificationMessage = 'Rejected your talk request.'
  } else if (type === 'new_message') {
    notificationMessage = 'Sent a new message to you. Click here to see the message.'
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
          <Text fontSize="sm" fontWeight="bold" cursor="pointer">{sender}</Text>
          <Text fontSize="xs" color="gray.700">{notificationMessage}</Text>
        </Flex>
      </Box>
    </>
  )
}

export default NotificationCard
