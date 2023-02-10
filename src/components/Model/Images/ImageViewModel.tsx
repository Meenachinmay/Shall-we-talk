import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Image,
  Box,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { imageViewModelState } from "../../../atoms/imageViewModelState";

type ImageViewModelProps = {
  imageUrl: string;
};

const ImageViewModel: React.FC<ImageViewModelProps> = ({ imageUrl }) => {
  const [modelState, setModelState] = useRecoilState(imageViewModelState);

  const handleClose = () => {
    setModelState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modelState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center"></ModalHeader>
          <ModalCloseButton />
          <ModalBody
            width={'md'}
            height={'md'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            >
            <Box boxSize={'md'}>
              <Image width={'md'} height={'md'} src={imageUrl} alt="Profile image" />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageViewModel;
