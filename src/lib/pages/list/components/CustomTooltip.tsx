import { Box, Tooltip } from "@chakra-ui/react";

export const CustomTooltip = ({ periodoGracia }: any) => {
  let label = "";

  switch (periodoGracia) {
    case "S":
      label = "Sin periodo de gracia";
      break;
    case "P":
      label = "Parcial";
      break;
    case "T":
      label = "Total";
      break;
    default:
      label = "";
  }

  return (
    <Box as="label" display="flex" justifyContent="center">
      <Tooltip label={label} placement="top" as="label" aria-label="A tooltip">
        {periodoGracia}
      </Tooltip>
    </Box>
  );
};
