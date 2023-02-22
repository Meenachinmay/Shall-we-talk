import React, { useEffect, useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const accessKeysCol = collection(firestore, "access-keys");
  const [success, setSuccessOk] = useState<boolean>(false);
  const [key, setAccessKey] = useState<string>("");
  //TODO:
  // use this access key to add a user in user space
  // user space's space id, spaceEmail, accessKey, noOfPeople, accesskeyActivated, virtualSpaceImage
  // get a virtual space where spaceId == spaceA@gmail.com AND accessKey == spaceA@gmail.com/spaceA_FEB_2023
  // vertual space table -> id, name, image, noOfPeople, accessKey, accessKeyActivated
  // user in the space table -> id, name, email, password, createdAt, updatedAt
  // user profile table -> id, name, email, profileImage, companyName, companyProfile, workProfile, hobbies, pet, pr, status
  // vs-user table -> id, name, email, companyName, status, profileImage

  function handleLogin() {
    if (success) {
      navigate(`/dashboard/${email}/${key}`);
    } else {
      alert('wrong acceess key, please contact to your co-working space.')  
    }
  }

  useEffect(() => {
    async function checkAccesskey() {
      const q = query(
        accessKeysCol,
        where("spaceId", "==", `${email}`),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().accessKey === key) {
          setSuccessOk(true);
        }
      });
    }

    checkAccesskey()

    console.log('rednering')

    return () => {}
  }, [email, accessKeysCol]);

  return (
    <>
      <Flex
        width={"full"}
        flexGrow={1}
        height={"100vh"}
        bg="red.600"
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex flexDirection={"column"}>
          <Input
            required
            onChange={(e) => setAccessKey(e.target.value)}
            type="text"
            mb={5}
            placeholder="enter access key"
          />
          <Button onClick={handleLogin}>Login to Dashboard</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
