import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
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

const NumberInputForm = ({
  id = "No id",
  title = "No title",
  contraints = "No contraints",
  value = "No value",
  prefix = "S/.",
  handleChange,
  errorMessage = null,
  precision = 2,
  isDisabled = false,
  min = null,
  max = null,
}: any) => {
  return (
    <FormControl isDisabled={isDisabled} isInvalid={Boolean(errorMessage)}>
      <FormLabel htmlFor={id}>
        <Box as="span" mr={2} fontSize={[13, 15]}>
          {title}
        </Box>
        <VerticallyCenter title={title} body={contraints} />
      </FormLabel>
      <InputGroup w="100%">
        {prefix && <InputLeftAddon children={prefix} />}
        <NumberInput
          allowMouseWheel
          id={id}
          name={id}
          variant="filled"
          precision={precision}
          defaultValue={value}
          min={min ?? 0}
          max={max ?? Number.MAX_SAFE_INTEGER}
          onChange={(e) => handleChange(e, id)}
          w="100%"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

function VerticallyCenter({ title, body }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <InfoOutlineIcon onClick={onOpen} cursor="pointer" />
      <Modal onClose={onClose} isOpen={isOpen} size={["xs","sm","md"]} isCentered allowPinchZoom>
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

export default NumberInputForm;
