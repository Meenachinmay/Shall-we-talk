import { Button, Flex } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import "../../components/homepage.css";
import { firestore, storage } from "../firebase/clientApp";

type RegisterASpaceProps = {};

const Register: React.FC<RegisterASpaceProps> = () => {
  const [email, setEmail] = useState<string | null>(null);
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

      const storageRef = ref(storage, `virtual-space-images/vs-image-${email}`);
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
      email: email,
      vsImage: vsImageUrl,
      keyActivated: false,
      virtualSpaceAlloted: false,
    });
    setLoading(false);
  };

  // updating user profile image
  useEffect(() => {
    if (!file) {
      return;
    }
    handleUploadVsImage();

    return () => {
      setFile(null);
    };
  }, [file, email]);
 
  return (
    <>
      <Flex
        flexGrow={1}
        height={"100vh"}
        alignItems={"center"}
        justifyContent="center"
        className="register-a-space"
      >
        <form onSubmit={onSubmit}>
          <Flex gap={'10px'} width='800px' p={5} alignItems={"center"}>
            <input
              required
              className='register-space-input'
              placeholder="Email for registration..."
              type={'text'}
              onChange={(event) => setEmail(event.target.value)}
            /> 
            <label className="image__upload" style={{ width: '200px'}} htmlFor="file">
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
              isLoading={loading}
              loadingText={"Sending request"}
              type="submit"
              width={'300px'}
              p={'10px'}
              color="white"
              bg="red.500"
              _hover={{ color: 'red.500', bg:'white', border: '1px solid', borderColor: 'red.500'}}
              transition='.4s'
            >
              Register
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default Register;
