import {
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { PREFIX, ResultItem } from "../interfaces/leasing";
import CountUp from "react-countup";

const Result = ({ item }: { item: ResultItem }) => {
  const { title, value, type } = item;

  return (
    <CountUp
      start={0}
      end={value}
      delay={0}
      duration={2.5}
      separator=","
      decimal="."
      decimals={type === PREFIX.NONE ? 0 : type === PREFIX.MONEY ? 2 : 4}
      prefix={type === PREFIX.MONEY ? PREFIX.MONEY : ""}
      suffix={type === PREFIX.PERCENTAGE ? " %" : ""}
    >
      {({ countUpRef }) => (
        <Stat>
          <StatLabel
            fontSize={[13, 15]}
            color={useColorModeValue("black", "white")}
          >
            {title}
          </StatLabel>
          <StatNumber
            ref={countUpRef}
            fontSize={[14, 20]}
            color={useColorModeValue("black", "red,100")}
          ></StatNumber>
        </Stat>
      )}
    </CountUp>
  );
};

export default Result;
