import { SimpleGrid } from "@chakra-ui/react";

// Components
import Result from "lib/@core/components/Result";

// Interfaces
import {
  LeasingOutputProps,
  PREFIX,
  ResultItem,
} from "lib/@core/interfaces/leasing";

// Framer motion
import { motion } from "framer-motion";
import {
  animateResultsVariants,
  initialResultsVariants,
} from "lib/shared/animation/variants";

// Others

const Results = ({ results }: { results: LeasingOutputProps }) => {
  return (
    <SimpleGrid
      columns={2}
      pt={[8, 8, 8, 8, 0]}
      rowGap={[8, 8, 8, 8, 2]}
      columnGap={8}
      id="resultados"
      as={motion.div}
      h={"100%"}
      initial={initialResultsVariants}
      animate={animateResultsVariants}
    >
      {Object.keys(results).map((key: string) => {
        const item: ResultItem = results[key as keyof LeasingOutputProps];
        return <Result key={key} item={item} />;
      })}
    </SimpleGrid>
  );
};

export default Results;
