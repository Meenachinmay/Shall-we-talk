import { Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

const SkeletonLine: React.FC = () => {
  return (
    <>
      <Skeleton bg="red.500" height="20px" />
    </>
  )
}

export default SkeletonLine
