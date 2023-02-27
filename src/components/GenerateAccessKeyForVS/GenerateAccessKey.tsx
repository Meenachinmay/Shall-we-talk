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

    // encrypt an email here
    await encryptData(emailToEncrypt)
      .then(email => setEncryptedEmail(email))
      .catch(error => console.log(error.message))

    setEncryptedEmail(filterEncryption(encryptedEmail))
    console.log(generateURL())

    // setLoading(true)
    // await setDoc(doc(firestore, `access-keys`, `spaceId-${emailToEncrypt}`), {
    //     accessKey: `SWT-AXAMET-2023`,
    //     activated: false,
    //     spaceId: emailToEncrypt
    // })

    setKey("SWT-AXAMET-2023")
    setLoading(false)
  }

  // generate a URL for user to login
  function generateURL() {
    let URL = `http://localhost:3000/user-login/${encryptedEmail}/${key}`
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
      <Button loadingText="Fetching..." isLoading={fetchingSpaces} mb={3} onClick={fetchRequests}>Fetch</Button>
      { requests?.map((req) => (
        <p key={req.email}>{req.email}</p>
      ))}

      <Input onChange={(e) => setEmailToEncrypt(e.target.value)} width={'sm'} mb="3" type="email" placeholder="Put email to generate URL / key"/>

      <Button isLoading={loading} loadingText="Generating access key..." onClick={generateKey}>Generate key</Button>
    </Flex>
  );
};

export default GenerateAccessKey;
