import React, { useState } from 'react'
import { Flex, Button, Input, FormControl,  Select } from '@chakra-ui/react'

type RegisterASpaceProps = {

}

const Register:React.FC<RegisterASpaceProps> = () => {     
    const [noOfPeople, setNoOfPeople] = useState<number>(0)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert(noOfPeople)
    }

    return (
      <Flex
        width={"full"}
        flexGrow={1}
        height={"100vh"}
        bg="red.600"
        alignItems={"center"}
        justifyContent="center"
      >
        <form onSubmit={onSubmit}>
          <Flex alignItems={"center"}>
            <Input
              type="email"
              w={"md"}
              mr={5}
              placeholder="Email for registration..."
              _placeholder={{ color: "white" }}
            />
            <FormControl width={'120px'}>
              <Select onChange={(event) => setNoOfPeople(parseInt(event.target.value))} placeholder="no of people" fontSize={'xs'}>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </Select>
            </FormControl>
            <Button ml={5} type="submit">Image URL</Button>
            <Button ml={5} type="submit">Register</Button>
          </Flex>
        </form>
      </Flex>
    );
}

export default Register