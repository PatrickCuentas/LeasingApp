import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from "@chakra-ui/react";

const NumberInputForm = ({
  id,
  title,
  handleChange,
  value,
  errorMessage = "",
  precision = 2,
}: any) => {
  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <FormLabel htmlFor={id}>{title}</FormLabel>
      <NumberInput
        variant="filled"
        id={id}
        name={id}
        precision={precision}
        defaultValue={value}
        onChange={(e) => handleChange(e, id)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default NumberInputForm;
