import React, { useState } from "react";
import { Input, Flex, Button } from "@chakra-ui/react";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { useParams } from "react-router-dom";
import { encryptData, filterEncryption } from "../../utilservices/Encryption";

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
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchingSpaces, setFetchingSpaces] = useState<boolean>(false)
  const [key, setKey] = useState<string>("")
  const [encryptedEmail, setEncryptedEmail] = useState<string> ("")
  const [emailToEncrypt, setEmailToEncrypt] = useState<string> ("")
  const [generatedUrl, setGeneratedUrl] = useState<string> ("")
  const keys = new Map<string, string>() 

  // fetch requests from co-working space
  async function fetchRequests () {
    const q = query(requestsCol)
    let data: IVSRequests[] = []
    setFetchingSpaces(true)
    const querySnapshot = await getDocs(q) 
    querySnapshot.forEach((doc) => {
        data.push(doc.data() as IVSRequests)
    })
    setFetchingSpaces(false)
    setRequests(data)
  }

  // function to generate access key
  async function generateKey () {

    if (!emailToEncrypt) {
      alert('Please provide an space email to generate.')
      return
    }
    // encrypt an email here
    
    setLoading(true)
    await setDoc(doc(firestore, `access-keys`, `spaceId-${emailToEncrypt}`), {
        accessKey: key,
        activated: false,
        spaceId: emailToEncrypt
    })

    // generate url here
    generateURL()
    setLoading(false)
  }

  // generate a URL for user to login
  function generateURL() {
    let URL = `http://localhost:3000/user-login/${emailToEncrypt}/${key}`
    setGeneratedUrl(URL)
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
      <Button loadingText="Fetching..." isLoading={fetchingSpaces} mb={3} onClick={fetchRequests}>Fetch</Button>
      { requests?.map((req) => (
        <p key={req.email}>{req.email}</p>
      ))}

      <Input onChange={(e) => setEmailToEncrypt(e.target.value)} width={'sm'} mb="3" type="email" placeholder="Put email to generate URL / key"/>
      <Input onChange={(e) => setKey(e.target.value)} width={'sm'} mb="3" type="text" placeholder="Put Key to generate URL"/>

      { generatedUrl ? <p>{generatedUrl}</p> : null }

      <Button isLoading={loading} loadingText="Generating access key..." onClick={generateKey}>Generate key</Button>
    </Flex>
  );
};

export default GenerateAccessKey;
