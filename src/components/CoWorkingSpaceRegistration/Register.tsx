import React, { useEffect, useState } from 'react'
import { Flex, Button, Input, FormControl,  Select } from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../firebase/clientApp'
import { GENERATE_ACCESS_KEY } from '../../keys/index'

type RegisterASpaceProps = {

}

const Register:React.FC<RegisterASpaceProps> = () => {     
    const [noOfPeople, setNoOfPeople] = useState<number>(0)
    const [email, setEmail] = useState<string | null>(null)
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        await setDoc(doc(firestore, `co-workingSpaces`, `spaceId-${email}`), {
            accessKey: `${email}/A-FEB-2023`,
            emailId: email,
            id: email,
            imageUrl: imageURL,
            keyActivated: false,
            noOfPeople: noOfPeople,
            virtualSpaceAlloted: false
        })
        setLoading(false)
    }

    useEffect(() => {
        setImageURL('http://picture.com/vs-image')
    },[email])

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
              onChange={(event) => setEmail(event.target.value) }
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
            <Button ml={5} isLoading={loading} loadingText={'Sending request'} type="submit">Register</Button>
          </Flex>
        </form>
      </Flex>
    );
}

export default Register