import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React from 'react'

const SearchInput: React.FC = () => {
  return (
    <Flex flexGrow={1} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents='none' children={<SearchIcon color='red.400' mb={1} />} />
        <Input color='red.500' placeholder="ユーザーを名前で検索" fontSize="10pt" _placeholder={{ color: "red.500" }}
          _hover={{ bg: "red.50", border: "solid 1px", borderColor: "red.500" }}
          _focus={{ outline: "none", border: "1px solid", borderColor: "red.500" }}
          height="34px" bg="white"
        />
      </InputGroup>
    </Flex>
  )
}

export default SearchInput
