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
      <Modal size={{ base: "xs", sm: "sm", md: "sm"}} isOpen={loaderModel.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg={"red.50"}>
          <ModalHeader textAlign="center">ログアウト中</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={"xs"} maxH={"xs"}>
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
