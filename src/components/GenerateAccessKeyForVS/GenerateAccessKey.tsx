import { Button, Flex, Input, Text } from "@chakra-ui/react";
import {
  collection,
  doc, getDocs,
  query,
  setDoc
} from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../firebase/clientApp";

type IVSRequests = {
  email: string;
  vsImage: string;
  noOfPeople: number;
  keyActivated: boolean;
  virtualSpaceAlloted: boolean;
};

const GenerateAccessKey: React.FC = () => {
  const [requests, setRequests] = useState<IVSRequests[] | null>(null);
  const requestsCol = collection(firestore, "co-workingSpaces");
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingSpaces, setFetchingSpaces] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [emailToEncrypt, setEmailToEncrypt] = useState<string>("");

  // fetch requests from co-working space
  async function fetchRequests() {
    const q = query(requestsCol);
    let data: IVSRequests[] = [];
    setFetchingSpaces(true);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as IVSRequests);
    });
    setFetchingSpaces(false);
    setRequests(data);
  }

  // function to generate access key
  async function generateKey() {
    if (!emailToEncrypt) {
      alert("Please provide an space email to generate.");
      return;
    }

    // Getting encoded email
    // const docRef = doc(firestore, "keys", `spaceId-${emailToEncrypt}`);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   setEncryptedEmail(docSnap.data().key);
    // } else {
    //   console.log("No such data is avaiable");
    // }

    // saving this key in database
    setLoading(true);
    await setDoc(doc(firestore, `access-keys`, `spaceId-${emailToEncrypt}`), {
      accessKey: key,
      activated: true,
      spaceId: emailToEncrypt,
    });

    // generate url here
    setLoading(false);
    setEmailToEncrypt("")
    setKey("")
  }

  
  return (
    <Flex
      width={"full"}
      flexGrow={1}
      height={"100vh"}
      alignItems={"center"}
      justifyContent="center"
      flexDir={"column"}
      className="generate-access-key"
    >
      <Button
        loadingText="Fetching..."
        isLoading={fetchingSpaces}
        mb={3}
        onClick={fetchRequests}
        color="white"
        bg="red.500"
        _hover={{
          color: "red.500",
          bg: "white",
          border: "1px solid",
          borderColor: "red.500",
        }}
        transition="1s"
      >
        Fetch Spaces
      </Button>
      {requests?.map((req) => (
        <Text
          bg="white"
          p={3}
          mb={3}
          _hover={{ bg: "gray.100" }}
          cursor="pointer"
          width="50%"
          borderRadius={"lg"}
          key={req.email}
          onClick={() => setEmailToEncrypt(req.email)}
        >
          {req.email}
        </Text>
      ))}

      <Input
        onChange={(e) => setEmailToEncrypt(e.target.value)}
        value={emailToEncrypt || ""}
        width={"sm"}
        mb="3"
        type="email"
        placeholder="Put email to generate URL / key"
        bg={"white"}
        required
      />
      <Input
        onChange={(e) => setKey(e.target.value)}
        width={"sm"}
        mb="3"
        type="text"
        placeholder="Put Key to generate URL"
        bg={"white"}
        required
      />

      <Button
        isLoading={loading}
        loadingText="Generating access key..."
        onClick={generateKey}
        color="white"
        bg="red.500"
        _hover={{
          color: "red.500",
          bg: "white",
          border: "1px solid",
          borderColor: "red.500",
        }}
        transition="1s"
      >
        Generate key
      </Button>
    </Flex>
  );
};

export default GenerateAccessKey;
