import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { emitWarning } from "process";

type GenerateAccessKeyForVSProps = {};

type IVSRequests = {
  email: string;
  vsImage: string;
  noOfPeople: number;
  accessKey: string;
  keyActivated: boolean;
  virtualSpaceAlloted: boolean;
};

const GenerateAccessKey: React.FC = () => {
  const [requests, setRequests] = useState<IVSRequests | null>(null);
  const requestsCol = collection(firestore, "co-workingSpaces")

  async function fetchRequests () {
    const q = query(requestsCol)
    const querySnapshot = await getDocs(q) 
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
    })
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
      <Button onClick={fetchRequests}>Fetch</Button>
      Hello world
    </Flex>
  );
};

export default GenerateAccessKey;
