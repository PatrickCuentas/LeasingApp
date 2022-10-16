import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { ResultItem } from "../interfaces/leasing";

const Result = ({ item, id }: { item: ResultItem; id: string }) => {
  const assignFixed = (item: ResultItem) => {
    if (item.type === "E") return item.value.toFixed(0);
    else if (item.type === "N") return item.value.toFixed(2);
    else if (item.type === "P") return item.value.toFixed(2);
  };

  return (
    <Stat>
      <StatLabel>{item.title}</StatLabel>
      <StatNumber id={id}>{assignFixed(item)}</StatNumber>
    </Stat>
  );
};

export default Result;
