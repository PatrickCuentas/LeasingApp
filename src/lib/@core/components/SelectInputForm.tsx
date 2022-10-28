import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from "@chakra-ui/react";

const SelectInputForm = ({
  id = "No ID",
  title = "No Title",
  contraints = "No contraints",
  options = [],
  value = 360,
  handleChange,
  prefix = "S/.",
  errorMessage = null,
  isDisabled = false,
}: any) => {
  return (
    <>
      <FormControl isDisabled={isDisabled} isInvalid={Boolean(errorMessage)}>
        <FormLabel htmlFor={id} fontSize={[13, 15]}>
          <Box as="span" mr={2} fontSize={[13, 15]}>
            {title}
          </Box>
          <VerticallyCenter title={title} body={contraints} />
        </FormLabel>
        <InputGroup w="100%">
          {prefix && <InputLeftAddon children={prefix} />}
          <Select
            variant="filled"
            defaultValue={360}
            value={value}
            onChange={(e) => handleChange(parseInt(e.target.value), id)}
          >
            {options.map((option: any) => (
              <option key={option.value} value={option.value} color={"white"}>
                {option.label}
              </option>
            ))}
          </Select>
        </InputGroup>
      </FormControl>
    </>
  );
};

function VerticallyCenter({ title, body }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <InfoOutlineIcon onClick={onOpen} cursor="pointer" />
      <Modal onClose={onClose} isOpen={isOpen} isCentered allowPinchZoom>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelectInputForm;
