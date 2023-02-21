import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const { email, key } = useParams();
  const navigate = useNavigate()
  //TODO:
  // use this access key to add a user in user space
  // user space's space id, spaceEmail, accessKey, noOfPeople, accesskeyActivated, virtualSpaceImage
  // get a virtual space where spaceId == spaceA@gmail.com AND accessKey == spaceA@gmail.com/spaceA_FEB_2023
  // vertual space table -> id, name, image, noOfPeople, accessKey, accessKeyActivated
  // user in the space table -> id, name, email, password, createdAt, updatedAt
  // user profile table -> id, name, email, profileImage, companyName, companyProfile, workProfile, hobbies, pet, pr, status
  // vs-user table -> id, name, email, companyName, status, profileImage

  function handleLogin () {
    navigate(
      `/dashboard`,
      {
        state: {
          email: email,
          key: key
        }
      }
    )
  }

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
        <Flex flexDirection={'column'}>
          <Button onClick={handleLogin}>Login to Dashboard</Button> 
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
