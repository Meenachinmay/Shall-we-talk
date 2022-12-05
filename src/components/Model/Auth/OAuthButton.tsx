import { Image, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import googlelogo from '../../../images/googlelogo.jpg'

const OAuthButton: React.FC = () => {
  return (
    <Flex direction='column' width="100%" mb={2}>
      <Button
        fontSize="10pt"
        fontWeight={700}
        bg="white"
        borderRadius={"60px"}
        color="gray.700"
        variant='solid'
        height="36px"
        width="100%"
        mt={2}
        mb={2}
        borderWidth={1}
        borderColor="gray.300"
      >
        <Image mr={4} src={googlelogo} height="20px" />
        Continue with google</Button>
    </Flex >
  )
}

export default OAuthButton
