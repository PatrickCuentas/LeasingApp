import {
  Box,
  Text,
  chakra,
  Flex,
  useCheckbox,
  Checkbox,
} from "@chakra-ui/react";

const CustomCheckbox = (props: any) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label py={1} cursor="pointer" {...htmlProps}>
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="green.500"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={2} h={2} bg="green.500" />}
      </Flex>
    </chakra.label>
  );
};

export default CustomCheckbox;
