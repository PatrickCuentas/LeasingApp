import {
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ResultItem } from "../interfaces/leasing";

const Result = ({ item, id }: { item: ResultItem; id: string }) => {
  return (
    <Stat>
      <StatLabel
        fontSize={[13, 15]}
        color={useColorModeValue("black", "white")}
      >
        {item.title}
      </StatLabel>
      <StatNumber
        id={id}
        fontSize={[14, 20]}
        color={useColorModeValue("black", "red,100")}
      >
        {item.value}
      </StatNumber>
    </Stat>
  );
};

export default Result;
