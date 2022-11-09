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

// components
import LeasingTablePaginated from "lib/@core/LeasingTablePaginated";
import NumberInputForm from "lib/@core/components/NumberInputForm";
import Results from "lib/@core/components/Results";
import SelectInputForm from "lib/@core/components/SelectInputForm";
import SaveLeasingDrawer from "./components/SaveLeasingDrawer";

// firebase
import { auth } from "lib/@auth/firebase/firebaseConfig";

// react-icons
import { ImArrowRight } from "react-icons/im";

// Framer motion
import { motion } from "framer-motion";
import { mainVariants } from "lib/shared/animation/variants";

// hooks
import useLeasing from "./hooks/useLeasing";

import {
  nDiasPorAnioOptions,
  frecuenciaDePagoOptions,
} from "lib/@core/utils/options";
import { CONSTRAINTS } from "lib/@core/utils/contraints";

// constants
const MONEDA = "S/.";

import "./index.css";

const Home = () => {
  const userName = auth?.currentUser?.displayName;

  const {
    formik,
    initialOutputResultsState,
    finalOutputResultsState,
    tableResults,
    hasResults,
    loading,
    leasingSavedState,
    formHandleChange,
    gracePeriodHandleChange,
    saveLeasing,
  } = useLeasing();

  const { isSaved, isSaving } = leasingSavedState;

  return (
    <>
      <Box bg={useColorModeValue("gray.30", "gray.900")}>
        <Text
          ml="8"
          fontSize={["md", "xl"]}
          fontFamily="monospace"
          fontWeight="bold"
        >
          Bienvenido de nuevo {userName || "Anónimo"} 🌟🌟
        </Text>
        <Heading
          m={[4, null, 8]}
          fontSize={[24, null, 32]}
          textAlign="center"
          lineHeight={1.6}
        >
          Leasing Financiero por el
          <Highlight
            query="método Francés"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "red.100",
              marginLeft: "0.5rem",
            }}
          >
            método Francés
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
                        ? mainVariants.withResults.initial
                        : mainVariants.withoutResults.initial
                    }
                    animate={
                      hasResults
                        ? mainVariants.withResults.animate
                        : mainVariants.withoutResults.animate
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
                      handleChange={formHandleChange}
                      errorMessage={formik.errors.precioVentaActivo}
                    />
                    <NumberInputForm
                      id="nDeAnios"
                      title="Número de Años"
                      handleChange={formHandleChange}
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
                      handleChange={formHandleChange}
                      prefix={"Dias"}
                      options={frecuenciaDePagoOptions}
                      contraints={CONSTRAINTS.frecuenciaDePago}
                    />
                    <SelectInputForm
                      id="nDiasPorAnio"
                      title="Número de Días por Año"
                      value={formik.values.nDiasPorAnio}
                      handleChange={formHandleChange}
                      prefix={"Dias"}
                      options={nDiasPorAnioOptions}
                      contraints={CONSTRAINTS.nDiasPorAnio}
                    />
                    <NumberInputForm
                      id="porcentajeTEA"
                      title="Porcentaje TEA"
                      handleChange={formHandleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeTEA}
                      errorMessage={formik.errors.porcentajeTEA}
                      contraints={CONSTRAINTS.porcentajeTEA}
                    />
                    <NumberInputForm
                      id="porcentajeImpuestoALaRenta"
                      title="Porcentaje Impuesto a la Renta"
                      handleChange={formHandleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeImpuestoALaRenta}
                      errorMessage={formik.errors.porcentajeImpuestoALaRenta}
                      contraints={CONSTRAINTS.porcentajeImpuestoALaRenta}
                    />
                    <NumberInputForm
                      id="porcentajeRecompra"
                      title="Porcentaje Recompra"
                      handleChange={formHandleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeRecompra}
                      errorMessage={formik.errors.porcentajeRecompra}
                      contraints={CONSTRAINTS.porcentajeRecompra}
                    />
                    <NumberInputForm
                      id="costesNotariales"
                      title="Costes Notariales"
                      handleChange={formHandleChange}
                      prefix={MONEDA}
                      value={formik.values.costesNotariales}
                      errorMessage={formik.errors.costesNotariales}
                      contraints={CONSTRAINTS.costesNotariales}
                    />
                    <NumberInputForm
                      id="costesRegistrales"
                      title="Costes Registrales"
                      handleChange={formHandleChange}
                      prefix={MONEDA}
                      value={formik.values.costesRegistrales}
                      errorMessage={formik.errors.costesRegistrales}
                      contraints={CONSTRAINTS.costesRegistrales}
                    />
                    <NumberInputForm
                      id="tasacion"
                      title="Tasación"
                      handleChange={formHandleChange}
                      prefix={MONEDA}
                      value={formik.values.tasacion}
                      errorMessage={formik.errors.tasacion}
                      contraints={CONSTRAINTS.tasacion}
                    />
                    <NumberInputForm
                      id="comisionDeEstudio"
                      title="Comisión de Estudio"
                      handleChange={formHandleChange}
                      prefix={MONEDA}
                      value={formik.values.comisionDeEstudio}
                      errorMessage={formik.errors.comisionDeEstudio}
                      contraints={CONSTRAINTS.comisionDeEstudio}
                    />
                    <NumberInputForm
                      id="comisionDeActivacion"
                      title="Comisión de Activación"
                      handleChange={formHandleChange}
                      prefix={MONEDA}
                      value={formik.values.comisionDeActivacion}
                      errorMessage={formik.errors.comisionDeActivacion}
                      contraints={CONSTRAINTS.comisionDeActivacion}
                    />
                    <NumberInputForm
                      id="comisionPeriodica"
                      title="Comisión Periódica"
                      handleChange={formHandleChange}
                      prefix={MONEDA}
                      value={formik.values.comisionPeriodica}
                      errorMessage={formik.errors.comisionPeriodica}
                      contraints={CONSTRAINTS.comisionPeriodica}
                    />
                    <NumberInputForm
                      id="porcentajeDeSeguroRiesgo"
                      title="Porcentaje Seguro de Riesgo"
                      handleChange={formHandleChange}
                      prefix={"%"}
                      value={formik.values.porcentajeDeSeguroRiesgo}
                      errorMessage={formik.errors.porcentajeDeSeguroRiesgo}
                      contraints={CONSTRAINTS.porcentajeDeSeguroRiesgo}
                    />
                    <NumberInputForm
                      id="tasaDescuentoKS"
                      title="Tasa de Descuento KS"
                      handleChange={formHandleChange}
                      prefix={"%"}
                      value={formik.values.tasaDescuentoKS}
                      errorMessage={formik.errors.tasaDescuentoKS}
                      contraints={CONSTRAINTS.tasaDescuentoKS}
                    />
                    <NumberInputForm
                      id="tasaDescuentoWACC"
                      title="Tasa de Descuento WACC"
                      handleChange={formHandleChange}
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
            <Flex
              flexDirection={["column", "column", "row"]}
              gap={[10, 10, 100]}
              py={8}
              justifyContent="center"
            >
              <Button
                aria-label="leasing button"
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
                <SaveLeasingDrawer
                  isSaved={isSaved}
                  isSaving={isSaving}
                  handler={saveLeasing}
                />
              )}
            </Flex>
          </Box>
        </form>
        <LeasingTablePaginated
          isLoading={loading}
          data={tableResults}
          handler={gracePeriodHandleChange}
        />
      </Box>
    </>
  );
};

export default Home;
