import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

// firebase
import { auth } from "../../@auth/firebase/firebaseConfig";

// react-icons
import { ImArrowRight } from "react-icons/im";

// formik
import { useFormik } from "formik";

// components
import LeasingTablePaginated from "../../@core/LeasingTablePaginated";
import NumberInputForm from "./components/NumberInputForm";
import Results from "../../@core/components/Results";

// Framer motion
import { motion, AnimatePresence } from "framer-motion";

// core items
import {
  LeasingEntryProps,
  LeasingInitialOutputProps,
  LeasingFinalOutputProps,
  LeasingTableProps,
} from "../../@core/interfaces/leasing";
import {
  DEMO_ENTRY_DATA,
  DEMO_FINAL_OUTPUT_DATA,
  DEMO_INITIAL_OUTPUT_DATA,
} from "../../@core/utils/initialStates";

import "./index.css";
import {
  calculateInitialOutputResults,
  calculateTableResults,
} from "lib/@core/helpers/calculationHelpers";

const Home = () => {
  const userName = auth?.currentUser?.displayName;
  const [hasResults, setHasResults] = useState(false);
  const [initialOutputResultsState, setInitialOutputResults] =
    useState<LeasingInitialOutputProps>(DEMO_INITIAL_OUTPUT_DATA);
  const [finalOutputResultsState, setFinalOutputResultsState] =
    useState<LeasingFinalOutputProps>(DEMO_FINAL_OUTPUT_DATA);
  const [tableResults, setTableResults] = useState<LeasingTableProps[]>([]);

  // LEASING_ENTRY_DATA;
  const formik = useFormik({
    initialValues: DEMO_ENTRY_DATA as LeasingEntryProps,
    onSubmit: (values: LeasingEntryProps) => {
      const initialOutputResults: LeasingInitialOutputProps =
        calculateInitialOutputResults(values, handleEndInitialOuputCalculation);

      const results = calculateTableResults(
        values,
        initialOutputResults,
        handleEndTableCalculation
      );

      // calculateFinalOutputResults(values);
    },
    validate: (values: LeasingEntryProps) => {
      const errors: any = {};

      for (const [key, value] of Object.entries(values)) {
        if (!value) {
          errors[key] = "Requerido";
        }
      }

      return errors;
    },
  });

  const handleEndInitialOuputCalculation = (
    initialOutputResults: LeasingInitialOutputProps
  ) => {
    setInitialOutputResults(initialOutputResults);
  };

  const handleEndTableCalculation = (results: LeasingTableProps[]) => {
    setHasResults(true);
    setTableResults(results);
    formik.setSubmitting(false);
  };

  const handleChange = (e: any, id: string) => {
    setHasResults(false);
    setTableResults([]);
    formik.setFieldValue(id, e);
  };

  const variants = {
    withResults: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        y: [-100, 0],
      },
    },
    withoutResults: {
      initial: {
        height: 0,
        opacity: 0,
      },
      animate: {
        height: "100%",
        opacity: 1,
        y: 0,
      },
    },
  };

  return (
    <Box bg={useColorModeValue("gray.30", "gray.900")}>
      <Text>Bienvenido de nuevo {userName} 🌟🌟</Text>
      <Text as="h1" align="center" fontSize="3xl" fontWeight="bold" mb={8}>
        Leasing Financiero
      </Text>
      {/* {JSON.stringify(formik.values, null, 4)} */}
      {/* {JSON.stringify(formik.isValid, null, 4)} */}
      <form onSubmit={formik.handleSubmit}>
        <Flex
          p={8}
          gap="100"
          as="main"
          bg={useColorModeValue("white", "gray.900")}
        >
          <SimpleGrid
            columns={hasResults ? [1, null, 3] : 1}
            width={hasResults ? "auto" : "100%"}
            spacing={5}
          >
            <SimpleGrid
              columns={2}
              spacing={10}
              as={motion.div}
              initial={
                hasResults
                  ? variants.withResults.initial
                  : variants.withoutResults.initial
              }
              animate={
                hasResults
                  ? variants.withResults.animate
                  : variants.withoutResults.animate
              }
              placeItems="flex-end"
            >
              <NumberInputForm
                id="precioVentaActivo"
                title="Precio de Venta del Activo"
                handleChange={handleChange}
                value={formik.values.precioVentaActivo}
                errorMessage={formik.errors.precioVentaActivo}
              />
              <NumberInputForm
                id="nDeAnios"
                title="Número de Años"
                handleChange={handleChange}
                value={formik.values.nDeAnios}
                precision={0}
                errorMessage={formik.errors.nDeAnios}
              />
              <NumberInputForm
                id="frecuenciaDePago"
                title="Frecuencia de Pago"
                handleChange={handleChange}
                value={formik.values.frecuenciaDePago}
                precision={0}
                errorMessage={formik.errors.frecuenciaDePago}
              />
              <NumberInputForm
                id="nDiasPorAnio"
                title="Número de Días por Año"
                handleChange={handleChange}
                value={formik.values.nDiasPorAnio}
                precision={0}
                errorMessage={formik.errors.nDiasPorAnio}
              />
              <NumberInputForm
                id="porcentajeTEA"
                title="Porcentaje TEA"
                handleChange={handleChange}
                value={formik.values.porcentajeTEA}
                errorMessage={formik.errors.porcentajeTEA}
              />
              <FormControl>
                <FormLabel>% de IGV</FormLabel>
                <Input isReadOnly isDisabled variant="filled" value="18.00%" />
              </FormControl>
              <NumberInputForm
                id="porcentajeImpuestoALaRenta"
                title="Porcentaje Impuesto a la Renta"
                handleChange={handleChange}
                value={formik.values.porcentajeImpuestoALaRenta}
                errorMessage={formik.errors.porcentajeImpuestoALaRenta}
              />
              <NumberInputForm
                id="porcentajeRecompra"
                title="Porcentaje Recompra"
                handleChange={handleChange}
                value={formik.values.porcentajeRecompra}
                errorMessage={formik.errors.porcentajeRecompra}
              />
              <NumberInputForm
                id="costesNotariales"
                title="Costes Notariales"
                handleChange={handleChange}
                value={formik.values.costesNotariales}
                errorMessage={formik.errors.costesNotariales}
              />
              <NumberInputForm
                id="costesRegistrales"
                title="Costes Registrales"
                handleChange={handleChange}
                value={formik.values.costesRegistrales}
                errorMessage={formik.errors.costesRegistrales}
              />
              <NumberInputForm
                id="tasacion"
                title="Tasación"
                handleChange={handleChange}
                value={formik.values.tasacion}
                errorMessage={formik.errors.tasacion}
              />
              <NumberInputForm
                id="comisionDeEstudio"
                title="Comisión de Estudio"
                handleChange={handleChange}
                value={formik.values.comisionDeEstudio}
                errorMessage={formik.errors.comisionDeEstudio}
              />
              <NumberInputForm
                id="comisionDeActivacion"
                title="Comisión de Activación"
                handleChange={handleChange}
                value={formik.values.comisionDeActivacion}
                errorMessage={formik.errors.comisionDeActivacion}
              />
              <NumberInputForm
                id="comisionPeriodica"
                title="Comisión Periódica"
                handleChange={handleChange}
                value={formik.values.comisionPeriodica}
                errorMessage={formik.errors.comisionPeriodica}
              />
              <NumberInputForm
                id="porcentajeDeSeguroRiesgo"
                title="Porcentaje de Seguro de Riesgo"
                handleChange={handleChange}
                value={formik.values.porcentajeDeSeguroRiesgo}
                errorMessage={formik.errors.porcentajeDeSeguroRiesgo}
              />
              <NumberInputForm
                id="tasaDescuentoKS"
                title="Tasa de Descuento KS"
                handleChange={handleChange}
                value={formik.values.tasaDescuentoKS}
                errorMessage={formik.errors.tasaDescuentoKS}
              />
              <NumberInputForm
                id="tasaDescuentoWACC"
                title="Tasa de Descuento WACC"
                handleChange={handleChange}
                value={formik.values.tasaDescuentoWACC}
                errorMessage={formik.errors.tasaDescuentoWACC}
              />
              <Button
                mt={8}
                w="100%"
                gridColumnStart={1}
                gridColumnEnd={3}
                size="lg"
                isDisabled={hasResults || !formik.isValid}
                isLoading={formik.isSubmitting}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Calcular
              </Button>
            </SimpleGrid>
            <AnimatePresence>
              {hasResults && (
                <>
                  <Flex justifyContent="center" alignItems="center">
                    <ImArrowRight />
                  </Flex>
                  <Results
                    results={{
                      ...initialOutputResultsState,
                      ...finalOutputResultsState,
                    }}
                  />
                </>
              )}
            </AnimatePresence>
          </SimpleGrid>
        </Flex>
      </form>
      <LeasingTablePaginated
        data={tableResults}
        setTableResults={setTableResults}
        values={formik.values}
        initialOutputResultsState={initialOutputResultsState}
      />
      {/* {JSON.stringify(results, null, 2)} */}
    </Box>
  );
};

export default Home;
