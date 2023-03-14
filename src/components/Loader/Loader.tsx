import {
    Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { loaderModelState } from "../../atoms/loaderModelState";
import LoadingSpin from "react-loading-spin";

const LoaderModel: React.FC = () => {
  const [loaderModel, setLoaderModelState] = useRecoilState(loaderModelState);

  const handleClose = () => {
    setLoaderModelState({
      open: false,
    });
  };

  return (
    <>
      <Modal isOpen={loaderModel.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg={"red.50"}>
          <ModalHeader textAlign="center">Loader</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={"sm"} maxH={"sm"}>
            <Center justifyContent={'center'} alignItems="center" className={"ExampleOfUsage"}>
              <LoadingSpin />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoaderModel;
