import { VStack, IconButton, Tooltip } from '@chakra-ui/react'
import { MdDashboard, MdMail, MdSettings } from 'react-icons/md'
import { HiLightningBolt, HiBell, HiSearch } from 'react-icons/hi'

const Navigation = () => {
  return (
    <VStack p={6} justifyContent="space-between" alignItems="center" w="full">
      <VStack>
        <Tooltip label="Dashboard" placement="right">
          <IconButton color="gray.500" icon={<MdDashboard />} aria-label="Dashboard" />
        </Tooltip>
        <Tooltip label="Actions" placement="right">
          <IconButton color="gray.500" icon={<HiLightningBolt />} aria-label="Actions" />
        </Tooltip>
        <Tooltip label="Search" placement="right">
          <IconButton color="gray.500" icon={<HiSearch />} aria-label="Search" />
        </Tooltip>
        <Tooltip label="Notification" placement="right">
          <IconButton color="gray.500" icon={<HiBell />} aria-label="Notification" />
        </Tooltip>
        <Tooltip label="Messages" placement="right">
          <IconButton color="gray.500" icon={<MdMail />} aria-label="Messages" />
        </Tooltip>
      </VStack>
      <Tooltip label="Settings" placement="right">
        <IconButton color="gray.500" icon={<MdSettings />} aria-label="Settings" />
      </Tooltip>
    </VStack>
  )
}

export default Navigation
