import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Progress,
  Flex,
  Box,
  Image,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bugFeatureModelState } from "../../../atoms/bugFeatureModelState";
import { currentUserState } from "../../../atoms/currentUserState";
import { firestore, storage } from "../../firebase/clientApp";

const BugFeatureModel: React.FC = () => {
  const [bugFeatureModel, setBugFeatureModelState] =
    useRecoilState(bugFeatureModelState);

  const [file, setFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string>("");
  const [bytesCount, setBytesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState)
  const [text, setText] = useState<string>("")

  const handleClose = () => {
    setBugFeatureModelState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  function handleBugImageUpload() {
    try {
      if (!file) {
        alert("Image upload error, Please select a picture to upload.");
        return;
      }

      const storageRef = ref(storage, `bug-featureImages/bugFeatureImage-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setUploadingImage(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setBytesCount(progress);
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
            setDownloadURL(downloadURL);
            setUploadingImage(false);
            setFile(null);
          });
        }
      );
    } catch (error) {
      console.log("There is an error to update the profile image now.");
    }
  }

  async function submitBugFeature() {
    try {
       setLoading(true) 
       await setDoc(doc(firestore, `bugReports/userId-${currentUser.id}`), {
        bugImageUrl: downloadURL,
        comment: text,
        userId: currentUser.id
       })
       setLoading(false)
       setFile(null)
       setDownloadURL("")
       setBugFeatureModelState({ open: false })
    } catch (error) {
        console.log(error)
    } 
  }

  useEffect(() => {
    if (!file) {
      return;
    }

    handleBugImageUpload();

    return () => {
      setFile(null);
    };
  }, [file]);

  return (
    <>
      <Modal size={{ base: "xs", sm: "sm", md: "lg" }} isOpen={bugFeatureModel.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg={"red.50"} height={'lg'}>
          <ModalHeader textAlign="center">
            <VStack>
              <Text>Report a Bug here!</Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            width={'100%'}
            height={'100%'}
            display="flex"
            flexDirection="column"
            overflowY={"scroll"}
            overflowX={"scroll"}
          >
            <Flex width={"full"} flexDir={"column"}>
              {uploadingImage ? (
                <Progress
                  width={{ base: "xs", sm: "sm", md: "full" }}
                  value={bytesCount}
                  mt={2}
                  mb={3}
                />
              ) : null}
              <Flex width={"full"} flexDirection={"column"}>
                <Textarea
                  resize={"vertical"}
                  maxLength={500}
                  placeholder="Please explain your bug here."
                  fontSize={"10pt"}
                  bg="white"
                  mb={3}
                  onChange={(e) => setText(e.target.value)}
                />
                <Flex w={"full"}>
                  <label
                    style={{ fontSize: "10px", fontWeight: "bold" }}
                    className="image__upload"
                    htmlFor="file"
                  >
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
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "red.500",
                      color: "red.500",
                      transition: "0.5s"
                    }}
                    bg="red.500"
                    color="white"
                    size={"xs"}
                    onClick={submitBugFeature}
                    isLoading={loading}
                    loadingText={"Submitting..."}
                  >
                    Submit
                  </Button>
                </Flex>
                <Box
                  mt={2}
                  width="100%"
                  height="100%"
                  boxSize={{ base: "xs", sm: "sm", md: "lg"}}
                  overflow="scroll"
                >
                  <Image
                    src={downloadURL}
                  />
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BugFeatureModel;
