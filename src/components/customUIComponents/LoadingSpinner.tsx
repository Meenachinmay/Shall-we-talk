import { HStack, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <VStack justifyItems="center" justifyContent="center" >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </VStack >
  )
}

export default LoadingSpinner
