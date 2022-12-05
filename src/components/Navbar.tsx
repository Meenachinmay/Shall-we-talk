import { Box, Button, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { HiBell } from 'react-icons/hi'
import NotificationsDrawer from './Drawers/NotificationsDrawer'
import RightContent from './Navbar/RightContent/RightContent'
import SearchInput from './SearchInput'

const Navbar: React.FC = () => {
  return (
    <Flex bg='white' height='70px' shadow="md" padding='24px 12px' alignItems="center">
      <Flex align='center'>
        <Text textColor={'purple.600'} fontWeight={'semibold'}>Shall</Text>
        <Text mr={2} fontWeight={"semibold"} textColor={'gray.700'}>weTalk</Text>
      </Flex>
      <SearchInput />
      <RightContent />
    </Flex >
  )
}

export default Navbar
