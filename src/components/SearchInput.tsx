import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React from 'react'

const SearchInput: React.FC = () => {
  return (
    <Flex flexGrow={1} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.400' mb={1} />} />
        <Input placeholder="ユーザー検索" fontSize="10pt" _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "solid 1px", borderColor: "blue.500" }}
          _focus={{ outline: "none", border: "1px solid", borderColor: "blue.500" }}
          height="34px" bg="gray.50"
        />
      </InputGroup>
    </Flex>
  )
}

export default SearchInput
