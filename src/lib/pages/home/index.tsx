import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Highlight,
  Grid,
  GridItem,
  Show,
} from "@chakra-ui/react";

// firebase
import { auth } from "lib/@auth/firebase/firebaseConfig";

// react-icons
import { ImArrowRight } from "react-icons/im";

// formik
import { useFormik } from "formik";

// components
import LeasingTablePaginated from "lib/@core/LeasingTablePaginated";
import NumberInputForm from "lib/@core/components/NumberInputForm";
import Results from "lib/@core/components/Results";
import SelectInputForm from "lib/@core/components/SelectInputForm";

// Framer motion
import { motion } from "framer-motion";

// interfaces
import {
  LeasingEntryProps,
  LeasingInitialOutputProps,
  LeasingFinalOutputProps,
  LeasingTableProps,
} from "lib/@core/interfaces/leasing";

// utilities
import {
  DEMO_ENTRY_DATA,
  DEMO_FINAL_OUTPUT_DATA,
  DEMO_INITIAL_OUTPUT_DATA,
} from "lib/@core/utils/states";
import { parseToFloat } from "lib/@core/utils/parse";
import { CONSTRAINTS } from "lib/@core/utils/contraints";
import {
  nDiasPorAnioOptions,
  frecuenciaDePagoOptions,
} from "lib/@core/utils/options";

// helpers
import {
  calculateFinalOutputResults,
  calculateInitialOutputResults,
  calculateTableResults,
  recalculateTableResults,
} from "lib/@core/helpers/calculations";

import "./index.css";

const MONEDA = "S/.";

const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const Home = () => {
  const userName = auth?.currentUser?.displayName;
  const [hasResults, setHasResults] = useState(false);
  const [initialOutputResultsState, setInitialOutputResults] =
    useState<LeasingInitialOutputProps>(DEMO_INITIAL_OUTPUT_DATA);
  const [finalOutputResultsState, setFinalOutputResultsState] =
    useState<LeasingFinalOutputProps>(DEMO_FINAL_OUTPUT_DATA);
  const [tableResults, setTableResults] = useState<LeasingTableProps[]>([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: DEMO_ENTRY_DATA as LeasingEntryProps,
    onSubmit: async (formData: LeasingEntryProps) => {
      await wait(100);
      const values: LeasingEntryProps = parseToFloat(formData);
      const initialOutputResults: LeasingInitialOutputProps =
        calculateInitialOutputResults(values);
      setInitialOutputResults(initialOutputResults);
      const table_results: LeasingTableProps[] = calculateTableResults(
        values,
        initialOutputResults,
        handleEndTableCalculation
      );
      const finalOutputResults: LeasingFinalOutputProps =
        calculateFinalOutputResults(values, table_results);
      setFinalOutputResultsState(finalOutputResults);
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

  const handleEndTableCalculation = (results: LeasingTableProps[]) => {
    setHasResults(true);
    setTableResults(results);
  };

  const handleChange = (e: any, id: string) => {
    setHasResults(false);
    setTableResults([]);
    formik.setFieldValue(id, e);
  };

  const radioInputHandler = (value: any) => async (index: any) => {
    const tableResultsCopy = [...tableResults];
    tableResultsCopy[index].periodoGracia = value;
    setLoading(true);
    await wait(1000);
    const newTableResults = recalculateTableResults(
      tableResultsCopy,
      formik.values,
      initialOutputResultsState
    );
    setTableResults(newTableResults);
    const results = calculateFinalOutputResults(formik.values, newTableResults);
    setFinalOutputResultsState(results);
    setLoading(false);
  };

  const variants = {
    withResults: {
      initial: {
        y: 0,
        opacity: 0,
      },
      animate: {
        opacity: 1,
        y: [-100, 0],
        height: "auto",
      },
    },
    withoutResults: {
      initial: {
        y: 0,
        height: 0,
        opacity: 0,
      },
      animate: {
        y: 0,
        height: "100%",
        opacity: 1,
      },
    },
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.30", "gray.900")}>
        <Text
          ml="8"
          fontSize={["md", "xl"]}
          fontFamily="monospace"
          fontWeight="bold"
        >
          Bienvenido de nuevo {userName} 🌟🌟
        </Text>
        <Heading
          m={[4, null, 8]}
          fontSize={[24, null, 32]}
          textAlign="center"
          lineHeight={1.6}
        >
          Leasing Financiero por el
          <Highlight
            query="método Frances"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "red.100",
              marginLeft: "0.5rem",
            }}
          >
            método Frances
          </Highlight>
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Box as="section" bg={useColorModeValue("white", "gray.900")} p={8}>
            <Flex gap="100">
              <Grid
                templateColumns={hasResults ? "repeat(12, 1fr)" : ""}
                w={"100%"}
              >
                <GridItem colSpan={[12, 12, 12, 12, 5]}>
                  <SimpleGrid
                    columns={
                      hasResults ? [1, 1, 1, 1, 2, 2] : [1, 2, 1, 1, 3, 4]
                    }
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
                    alignItems="baseline"
                  >
                    <NumberInputForm
                      id="precioVentaActivo"
                      title="Precio de Venta del Activo"
                      contraints={CONSTRAINTS.precioVentaActivo}
                      value={formik.values.precioVentaActivo}
                      prefix={MONEDA}
                      handleChange={handleChange}
                      errorMessage={formik.errors.precioVentaActivo}
                    />
                    <NumberInputForm
                      id="nDeAnios"
                      title="Número de Años"
                      handleChange={handleChange}
                      prefix={"Años"}
                      min={1}
                      max={30}
                      value={formik.values.nDeAnios}
                      precision={0}
                      errorMessage={formik.errors.nDeAnios}
                      contraints={CONSTRAINTS.nDeAnios}
                    />
                    <SelectInputForm
                      id="frecuenciaDePago"
                      title="Frecuencia de Pago"
                      value={formik.values.frecuenciaDePago}
                      handleChange={handleChange}
                      prefix={"Dias"}
                      options={frecuenciaDePagoOptions}
                    />
                    <SelectInputForm
                      id="nDiasPorAnio"
                      title="Número de Días por Año"
                      value={formik.values.nDiasPorAnio}
                      handleChange={handleChange}
                      prefix={"Dias"}
                      options={nDiasPorAnioOptions}
                    />
                    <NumberInputForm
                      id="porcentajeTEA"
                      title="Porcentaje TEA"
                      handleChange={handleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeTEA}
                      errorMessage={formik.errors.porcentajeTEA}
                      contraints={CONSTRAINTS.porcentajeTEA}
                    />
                    <NumberInputForm
                      id="porcentajeImpuestoALaRenta"
                      title="Porcentaje Impuesto a la Renta"
                      handleChange={handleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeImpuestoALaRenta}
                      errorMessage={formik.errors.porcentajeImpuestoALaRenta}
                      contraints={CONSTRAINTS.porcentajeImpuestoALaRenta}
                    />
                    <NumberInputForm
                      id="porcentajeRecompra"
                      title="Porcentaje Recompra"
                      handleChange={handleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeRecompra}
                      errorMessage={formik.errors.porcentajeRecompra}
                      contraints={CONSTRAINTS.porcentajeRecompra}
                    />
                    <NumberInputForm
                      id="costesNotariales"
                      title="Costes Notariales"
                      handleChange={handleChange}
                      prefix={MONEDA}
                      value={formik.values.costesNotariales}
                      errorMessage={formik.errors.costesNotariales}
                      contraints={CONSTRAINTS.costesNotariales}
                    />
                    <NumberInputForm
                      id="costesRegistrales"
                      title="Costes Registrales"
                      handleChange={handleChange}
                      prefix={MONEDA}
                      value={formik.values.costesRegistrales}
                      errorMessage={formik.errors.costesRegistrales}
                      contraints={CONSTRAINTS.costesRegistrales}
                    />
                    <NumberInputForm
                      id="tasacion"
                      title="Tasación"
                      handleChange={handleChange}
                      prefix={MONEDA}
                      value={formik.values.tasacion}
                      errorMessage={formik.errors.tasacion}
                      contraints={CONSTRAINTS.tasacion}
                    />
                    <NumberInputForm
                      id="comisionDeEstudio"
                      title="Comisión de Estudio"
                      handleChange={handleChange}
                      prefix={MONEDA}
                      value={formik.values.comisionDeEstudio}
                      errorMessage={formik.errors.comisionDeEstudio}
                      contraints={CONSTRAINTS.comisionDeEstudio}
                    />
                    <NumberInputForm
                      id="comisionDeActivacion"
                      title="Comisión de Activación"
                      handleChange={handleChange}
                      prefix={MONEDA}
                      value={formik.values.comisionDeActivacion}
                      errorMessage={formik.errors.comisionDeActivacion}
                      contraints={CONSTRAINTS.comisionDeActivacion}
                    />
                    <NumberInputForm
                      id="comisionPeriodica"
                      title="Comisión Periódica"
                      handleChange={handleChange}
                      prefix={MONEDA}
                      value={formik.values.comisionPeriodica}
                      errorMessage={formik.errors.comisionPeriodica}
                      contraints={CONSTRAINTS.comisionPeriodica}
                    />
                    <NumberInputForm
                      id="porcentajeDeSeguroRiesgo"
                      title="Porcentaje de Seguro de Riesgo"
                      handleChange={handleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeDeSeguroRiesgo}
                      errorMessage={formik.errors.porcentajeDeSeguroRiesgo}
                      contraints={CONSTRAINTS.porcentajeDeSeguroRiesgo}
                    />
                    <NumberInputForm
                      id="tasaDescuentoKS"
                      title="Tasa de Descuento KS"
                      handleChange={handleChange}
                      prefix={"%"}
                      value={formik.values.tasaDescuentoKS}
                      errorMessage={formik.errors.tasaDescuentoKS}
                      contraints={CONSTRAINTS.tasaDescuentoKS}
                    />
                    <NumberInputForm
                      id="tasaDescuentoWACC"
                      title="Tasa de Descuento WACC"
                      handleChange={handleChange}
                      prefix={"%"}
                      value={formik.values.tasaDescuentoWACC}
                      errorMessage={formik.errors.tasaDescuentoWACC}
                      contraints={CONSTRAINTS.tasaDescuentoWACC}
                    />
                    <NumberInputForm
                      id="porcentajeDeIGV"
                      title="Porcentaje de IGV"
                      prefix={"%"}
                      value={18}
                      isDisabled
                      hasTooltip={false}
                    />
                  </SimpleGrid>
                </GridItem>
                {hasResults && (
                  <>
                    <Show above="xl">
                      <GridItem colSpan={[0, 0, 2]}>
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          h={"full"}
                        >
                          <ImArrowRight />
                        </Flex>
                      </GridItem>
                    </Show>
                    <GridItem colSpan={[12, 12, 12, 12, 5]}>
                      <Results
                        isLoading={loading}
                        results={{
                          ...initialOutputResultsState,
                          ...finalOutputResultsState,
                        }}
                      />
                    </GridItem>
                  </>
                )}
              </Grid>
            </Flex>
            <Flex gap="100" py={8} justifyContent="center">
              <Button
                mt={8}
                minW={"200px"}
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
              {hasResults && (
                <Button
                  mt={8}
                  minW={"200px"}
                  gridColumnStart={1}
                  gridColumnEnd={3}
                  size="lg"
                  isDisabled
                  isLoading={formik.isSubmitting}
                  bg={"rgba(255,99,71,1)"}
                  color={"white"}
                  _hover={{
                    bg: "rgba(255,99,71,.7)",
                  }}
                  type="submit"
                >
                  Guardar
                </Button>
              )}
            </Flex>
          </Box>
        </form>
        <LeasingTablePaginated
          isLoading={loading}
          data={tableResults}
          handler={radioInputHandler}
        />
      </Box>
    </>
  );
};

export default Home;
