import { useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";

// Components
import Result from "lib/@core/components/Result";

// Interfaces
import { ResultItem } from "lib/@core/interfaces/leasing";

import { CountUp } from "countup.js";
import { motion } from "framer-motion";

const Results = ({ results }: any) => {
  const entries = Object.keys(results);

  useEffect(() => {
    entries.forEach((key) => {
      const value = results[key].value;
      const type = results[key].type;
      const countUp = new CountUp(key, value, {
        decimalPlaces: type === "E" ? 0 : type === "N" ? 2 : 2,
        prefix: type === "E" ? "" : type === "N" ? "S/." : "",
        suffix: type === "E" ? "" : type === "P" ? "%" : "",
      });
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  }, []);

  return (
    <SimpleGrid
      columns={2}
      rowGap={2}
      columnGap={8}
      id="resultados"
      as={motion.div}
      initial={{
        height: "100%",
        opacity: 0,
        y: 0,
      }}
      animate={{
        opacity: 1,
        y: [-100, 0],
      }}
      exit={{
        height: 0,
        opacity: 0,
        y: 0,
      }}
    >
      {entries.map((key: string) => {
        const item: ResultItem = results[key] as ResultItem;
        return <Result key={key} item={item} id={key} />;
      })}
    </SimpleGrid>
  );
};

export default Results;
