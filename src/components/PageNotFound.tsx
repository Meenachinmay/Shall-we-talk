import React from 'react'
import { Text, Center, Flex, Link } from '@chakra-ui/react'

const PageNotFound: React.FC = () => {
  return (
    <div>
      <Flex flexDirection="column" alignItems="center">
        <Text fontSize="xl" color="red.500">
          Page does not exists.
        </Text>
        <Text fontSize="md" color="gray.700">
          <Link href="/">
            Click here to go to home page.
          </Link>
        </Text>
      </Flex>
    </div >
  )
}

export default PageNotFound
