import { Drawer, DrawerContent, DrawerCloseButton, DrawerOverlay } from '@chakra-ui/react'
import ChatHistory from '../ChatHistory'

type Props = {
  isOpen: boolean,
  onClose: () => void
}

const ChatHistoryDrawer: React.FC<Props> = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatHistory />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default ChatHistoryDrawer
