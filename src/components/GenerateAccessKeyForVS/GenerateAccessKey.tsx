import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { useParams } from "react-router-dom";

type GenerateAccessKeyForVSProps = {};

type IVSRequests = {
  email: string;
  vsImage: string;
  noOfPeople: number;
  keyActivated: boolean;
  virtualSpaceAlloted: boolean;
};

const GenerateAccessKey: React.FC = () => {
  const [requests, setRequests] = useState<IVSRequests[] | null>(null);
  const requestsCol = collection(firestore, "co-workingSpaces")
  const { email } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [key, setKey] = useState<string>("")

  // fetch requests from co-working space
  async function fetchRequests () {
    const q = query(requestsCol)
    let data: IVSRequests[] = []
    const querySnapshot = await getDocs(q) 
    querySnapshot.forEach((doc) => {
        data.push(doc.data() as IVSRequests)
    })
    setRequests(data)
  }

  // function to generate access key
  async function generateKey () {
    setLoading(true)
    await setDoc(doc(firestore, `access-keys`, `spaceId-${email}`), {
        accessKey: `SWT-AXAMET-2023`,
        activated: false,
        spaceId: email
    })
    setKey("SWT-AXAMET-2023")
    setLoading(false)
  }

  // generate a URL for user to login
  async function generateURL() {
    let URL = `http://localhost:3000/user-login/${email}/${key}`
    return URL
  }

  return (
    <Flex
      width={"full"}
      flexGrow={1}
      height={"100vh"}
      bg="red.600"
      alignItems={"center"}
      justifyContent="center"
      flexDir={'column'}
    >
      <Button mb={2} onClick={fetchRequests}>Fetch</Button>
      { requests?.map((req) => (
        <p key={req.email}>{req.email}</p>
      ))}

      <Button isLoading={loading} loadingText="Generating access key..." onClick={generateKey}>Generate key</Button>
    </Flex>
  );
};

export default GenerateAccessKey;
