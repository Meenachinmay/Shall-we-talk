import React from "react";
import { useParams } from "react-router-dom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const { accessKey } = useParams();

  //TODO:
    // use this access key to add a user in user space
    // user space's space id, spaceEmail, accessKey, noOfPeople, accesskeyActivated, virtualSpaceImage
    // get a virtual space where spaceId == spaceA@gmail.com AND accessKey == spaceA@gmail.com/spaceA_FEB_2023
    // vertual space table -> id, name, image, noOfPeople, accessKey, accessKeyActivated
    // user in the space table -> id, name, email, password, createdAt, updatedAt
    // user profile table -> id, name, email, profileImage, companyName, companyProfile, workProfile, hobbies, pet, pr, status
    // vs-user table -> id, name, email, companyName, status, profileImage

  return (
     <div>hello world form login</div> 
  );
};

export default Login;
