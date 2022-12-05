import React from 'react'
import { Avatar, Text, AvatarBadge, Box, Divider, Flex, Heading, HStack, IconButton, VStack, List, ListItem } from '@chakra-ui/react'
import { RiInstallFill, RiYoutubeFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const RecipientDetail: React.FC = () => {
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <Avatar size="xl" name="Ayumu Oshiro">
        <AvatarBadge boxSize={6} borderWidth={4} bg="green.400" />
      </Avatar>
      <Heading size="sm" mt={3}>
        <Link to={`/home/${123}`} state={{ name: "Chinmay anand", status: "online" }}>Ayumu Oshiro</Link>
      </Heading>
      <HStack px={8} justifyContent="center" spacing={3} mt={3}>
        <IconButton
          icon={<RiYoutubeFill />}
          aria-label="Youtube"
          variant="ghost"
          rounded="full"
          color="gray.500"
          _hover={{ color: 'red.500' }}
          h={10}
        />
        <IconButton
          icon={<RiInstallFill />}
          aria-label="Instagram"
          variant="ghost"
          rounded="full"
          color="gray.500"
          _hover={{ color: "purple.400" }}
          h={10}
        />
      </HStack>
      <Box px={8} w="full"><Divider mt={6} color="gray.100" /></Box>
      <VStack w="full" h="full" spacing={4} overflowY="auto">
        <HStack px={12} w="full" mt={6} justifyContent="space-between">
          <Heading size="xs">Gender:</Heading>
          <Text color="gray.500" fontSize="sm">Male</Text>
        </HStack>
        <HStack px={12} w="full" mt={6} justifyContent="space-between">
          <Heading size="xs">Age:</Heading>
          <Text color="gray.500" fontSize="sm">23</Text>
        </HStack>
        <HStack px={12} w="full" mt={6} justifyContent="space-between">
          <Heading size="xs">Company Name</Heading>
          <Text color="gray.500" fontSize="sm">Real connect</Text>
        </HStack>
        <HStack px={12} w="full" mt={6} justifyContent="space-between">
          <Heading size="xs">Company Profile</Heading>
          <Text color="gray.500" fontSize="sm">IT company</Text>
        </HStack>
        <HStack px={12} w="full" mt={6} justifyContent="space-between">
          <Heading size="xs">Work profile</Heading>
          <Text color="gray.500" fontSize="sm">Engineering manager</Text>
        </HStack>
        <Flex flexDirection="column" px={12} w="full" mt={6}>
          <Heading mb={2} size="xs">PR</Heading>
          <Text
            w="full"
            h="full"
            fontSize="xs"
            color="gray.500"
          >
            I am handling project managing work at this company.I am handling project managing work at this company.I am handling project managing work at this company.I am handling project managing work at this company.
          </Text>
        </Flex>
      </VStack >
    </Flex >
  )
}

export default RecipientDetail
