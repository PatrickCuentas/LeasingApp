import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { ImArrowRight } from "react-icons/im";
import { useTheme } from "@emotion/react";
import { auth } from "../../../firebase";
import { useFormik } from "formik";

import "./index.css";
import TableResults from "./components/TableResults";
import Bounds from "../bound/index";

type FormResults = {};

const Home = () => {
  const theme = useTheme();
  const userName = auth?.currentUser?.displayName;
  const [completed, setCompleted] = useState(false);
  const [resultados, setResultados] = useState({
    igv: null,
    valorVentaActivo: null,
    montoDelLeasing: null,
    porcentajeTEP: null,
    numeroCuotasPorAnio: null,
    numeroTotalDeCuotas: null,
    seguroRiesgo: null,
    intereses: null,
    amortizacionDelCapital: null,
    seguroContraTodoRiesgo: null,
    comisionesPeriodicas: null,
    recompra: null,
    desembolsoTotal: null,
    tceaFlujoBruto: null,
    tceaFlujoNeto: null,
    vanFlujoBruto: null,
    vanFlujoNeto: null,
  });

  const formik = useFormik({
    initialValues: {
      previoVentaActivo: "",
      nDeAnios: "",
      frecuenciaDePago: "",
      nDiasPorAnio: "",
      porcentajeTEA: "",
      porcentajeImpuestoALaRenta: "",
      porcentajeRecompra: "",
      costesNotariales: "",
      costesRegistrales: "",
      tasacion: "",
      comisionDeEstudio: "",
      comisionDeActivacion: "",
      comisionPeriodica: "",
      porcentajeDeSeguroRiesgo: "",
      tasaDescuentoKs: "",
      tasaDescuentoWACC: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box>
      <Text>Bienvenido de nuevo {userName} 🌟🌟</Text>
      <Text as="h1" align="center" fontSize="3xl" fontWeight="bold">
        Leasing Financiero
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Flex p={8} gap="100" as="main">
          <SimpleGrid columns={2} spacing={5}>
            <FormControl>
              <FormLabel htmlFor="precioVentaActivo">
                Precio de Venta del Activo
              </FormLabel>
              <Input
                id="precioVentaActivo"
                name="previoVentaActivo"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.previoVentaActivo}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nDeAnios">N° de Años</FormLabel>
              <Input
                id="nDeAnios"
                name="nDeAnios"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.nDeAnios}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="frecuenciaDePago">
                Frecuencia de Pago
              </FormLabel>
              <Input
                id="frecuenciaDePago"
                name="frecuenciaDePago"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.frecuenciaDePago}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nDiasPorAnio">N° de días por año</FormLabel>
              <Input
                id="nDiasPorAnio"
                name="nDiasPorAnio"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.nDiasPorAnio}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="porcentajeTEA">% de TEA</FormLabel>
              <Input
                id="porcentajeTEA"
                name="porcentajeTEA"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.porcentajeTEA}
              />
            </FormControl>
            <FormControl>
              <FormLabel>% de IGV</FormLabel>
              <Input isReadOnly isDisabled variant="filled" value="18.00%" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="porcentajeImpuestoALaRenta">
                % de Impuesto a la renta
              </FormLabel>
              <Input
                id="porcentajeImpuestoALaRenta"
                name="porcentajeImpuestoALaRenta"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.porcentajeImpuestoALaRenta}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="porcentajeImpuestoALaRenta">
                % de Impuesto a la renta
              </FormLabel>
              <Input
                id="porcentajeImpuestoALaRenta"
                name="porcentajeImpuestoALaRenta"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.porcentajeImpuestoALaRenta}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="porcentajeRecompra">
                % de de recompra
              </FormLabel>
              <Input
                id="porcentajeRecompra"
                name="porcentajeRecompra"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.porcentajeRecompra}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="costesNotariales">
                Costes Notariales
              </FormLabel>
              <Input
                id="costesNotariales"
                name="costesNotariales"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.costesNotariales}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="costesRegistrales">
                Costes Registrales
              </FormLabel>
              <Input
                id="costesRegistrales"
                name="costesRegistrales"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.costesRegistrales}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tasacion">Tasación</FormLabel>
              <Input
                id="tasacion"
                name="tasacion"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.tasacion}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tasacion">Comisión de estudio</FormLabel>
              <Input
                id="comisionDeEstudio"
                name="comisionDeEstudio"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.comisionDeEstudio}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tasacion">Comisión de activación</FormLabel>
              <Input
                id="comisionDeActivacion"
                name="comisionDeActivacion"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.comisionDeActivacion}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tasacion">Comisión de periodica</FormLabel>
              <Input
                id="comisionPeriodica"
                name="comisionPeriodica"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.comisionPeriodica}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="porcentajeDeSeguroRiesgo">
                % de Seguro Riesgo
              </FormLabel>
              <Input
                id="porcentajeDeSeguroRiesgo"
                name="porcentajeDeSeguroRiesgo"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.porcentajeDeSeguroRiesgo}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tasaDescuentoKs">
                Tasa de descuento Ks
              </FormLabel>
              <Input
                id="tasaDescuentoKs"
                name="tasaDescuentoKs"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.tasaDescuentoKs}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tasaDescuentoKs">
                Tasa de descuento WACC
              </FormLabel>
              <Input
                id="tasaDescuentoKs"
                name="tasaDescuentoKs"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.tasaDescuentoKs}
              />
            </FormControl>
          </SimpleGrid>
          <Flex justifyContent="center" alignItems="center">
            <ImArrowRight />
          </Flex>
          {!completed && (
            <SimpleGrid
              columns={2}
              rowGap={4}
              columnGap={8}
              id="resultados"
              className=""
            >
              {/* para los resultados */}
              <Stat>
                <StatLabel>I.G.V.</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Valor Venta del Activo</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Monto del Leasing</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>% de TEP</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>N° Cuotas por Año</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>N° Total de Cuotas</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Seguro Riesgo</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Intereses</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Amortizacion del capital</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Seguro contra todo riesgo</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Comisiones periodicas</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Recompra</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Desembolso total</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>TCEA Flujo Bruto</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>TCEA Flujo Neto</StatLabel>
                <StatNumber>£0.00</StatNumber>
              </Stat>
            </SimpleGrid>
          )}
        </Flex>
        {/* <Button
											bg={"blue.400"}
											color={"white"}
											_hover={{
												bg: "blue.500",
											}}
											onClick={handleLogin}
										>
											Iniciar Sesión
										</Button> */}
      </form>
      {/* <TableResults /> */}
      <Bounds />
      {/* {JSON.stringify(formik.values, null, 2)} */}
    </Box>
  );
};

export default Home;
