import {
  Box,
  HStack,
  Tooltip,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

const getLabel = (value: string) => {
  switch (value) {
    case "T":
      return "Total";
    case "S":
      return "Sin Periodo de Gracia";
    case "P":
      return "Parcial";
    default:
      return "";
  }
};

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        <Tooltip label={getLabel(props.value)} placement="top" as="label">
          {props.children}
        </Tooltip>
      </Box>
    </Box>
  );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function RadioInputForm({ handler, index }: any) {
  const options = ["T", "S", "P"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "periodoGracia",
    defaultValue: "S",
    onChange: (e) => handler(e)(index),
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio} value={value}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default RadioInputForm;
