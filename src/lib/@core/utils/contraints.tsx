import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { MdCheckCircle, MdSettings } from "react-icons/md";

const ListWrapper = ({ contraints }: any) => {
  return (
    <List spacing={3}>
      {contraints.map((item: any, index: any) => (
        <ListItem key={index}>
          <ListIcon as={MdSettings} color="green.500" />
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export const CONSTRAINTS = {
  precioVentaActivo: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  nDeAnios: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  frecuenciaDePago: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  nDiasPorAnio: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  porcentajeTEA: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  porcentajeImpuestoALaRenta: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  porcentajeRecompra: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  costesNotariales: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  costesRegistrales: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  tasacion: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  comisionDeEstudio: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  comisionDeActivacion: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  comisionPeriodica: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  porcentajeDeSeguroRiesgo: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  tasaDescuentoKS: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
  tasaDescuentoWACC: (
    <>
      <ListWrapper contraints={["Debe ser mayor a 0"]} />
    </>
  ),
};
