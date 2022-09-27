import { Box, chakra, Flex, useCheckbox, Checkbox } from "@chakra-ui/react";

const CustomCheckbox = (props: any) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      py={1}
      cursor="pointer"
      {...htmlProps}
      p={2}
      position="relative"
    >
      <input
        {...getInputProps()}
        hidden
        style={{ position: "absolute", scale: "0" }}
      />
      <Flex
        as={Checkbox}
        alignItems="center"
        justifyContent="center"
        w={4}
        h={4}
        variant="custom-checkbox"
        isChecked={state.isChecked}
        {...getCheckboxProps()}
      ></Flex>
    </chakra.label>
  );
};

export default CustomCheckbox;
