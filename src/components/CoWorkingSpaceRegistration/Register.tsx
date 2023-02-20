import React, { useEffect, useState } from "react";
import { Flex, Button, Input, FormControl, Select } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/clientApp";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

type RegisterASpaceProps = {};

const Register: React.FC<RegisterASpaceProps> = () => {
  const [noOfPeople, setNoOfPeople] = useState<number>(0);
  const [email, setEmail] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [vsImageUrl, setVsImageURL] = useState<string | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [bytesCount, setBytesCount] = useState<number>(0);

  const handleUploadVsImage = async () => {
    try {
      if (!file) {
        alert("Image upload error, Please select a picture to upload.");
        return;
      }

      const storageRef = ref(storage, `vs-image-${email}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setBytesCount(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused.");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setVsImageURL(downloadURL);
          });
        }
      );
    } catch (error) {
      console.log("There is an error to update the profile image now.");
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await setDoc(doc(firestore, `co-workingSpaces`, `spaceId-${email}`), {
      accessKey: `${email}/A-FEB-2023`,
      emailId: email,
      id: email,
      imageUrl: vsImageUrl,
      keyActivated: false,
      noOfPeople: noOfPeople,
      virtualSpaceAlloted: false,
    });
    setLoading(false);
  };

  // updating user profile image
  useEffect(() => {
      if (!file) { 
        return
      }
      handleUploadVsImage()

      return () => {
        setFile(null)
      }
  }, [file, email])

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
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormControl width={"120px"}>
            <Select
              onChange={(event) => setNoOfPeople(parseInt(event.target.value))}
              placeholder="no of people"
              fontSize={"xs"}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </Select>
          </FormControl>
          <label className="image__upload" htmlFor="file">
            イメージ選択
          </label>
          <input
            onChange={(event) => setFile(event.target.files![0])}
            accept="image/*"
            type="file"
            id="file"
            style={{ display: "none" }}
          />
          <Button
            ml={5}
            isLoading={loading}
            loadingText={"Sending request"}
            type="submit"
          >
            Register
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Register;
