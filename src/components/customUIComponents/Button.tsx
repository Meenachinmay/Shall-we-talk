import { Button } from '@chakra-ui/react'
import React from 'react'

type UIButtonProps = {
  label: string
}

const UIButton: React.FC<UIButtonProps> = ({ label }) => {
  return (
    <Button
      _hover={{
        bg: "white", border: "1px solid", borderColor: "blue.500", color: "blue.500"
      }}
      type="submit"
      fontSize="10pt"
      fontWeight={700}
      bg="blue.500"
      borderRadius={"60px"}
      color="white"
      variant='solid'
      height="36px"
      width="100%"
      mt={2}
      mb={2}>{label}</Button>
  )
}

export default UIButton
