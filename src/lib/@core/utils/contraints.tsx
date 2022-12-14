import {
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheck,
  FiMinus,
  FiX,
} from "react-icons/fi";

interface Contraints {
  listItems: string[];
  examples?: {
    success?: string[];
    error?: string[];
  };
  options?: string[];
}

const Content = ({ key, item }: any) => {
  return (
    <ListItem key={key} ml={6}>
      <Flex alignItems="center">
        <ListIcon
          as={FiMinus}
          color="white"
          style={{ fontSize: ".6rem", color: "gray.300" }}
        />
        <Text as="span" fontSize={["sm", "md"]}>
          {item}
        </Text>
      </Flex>
    </ListItem>
  );
};

export const ListWrapper = ({ contraints }: { contraints: Contraints }) => {
  const { listItems, examples, options } = contraints;

  return (
    <List spacing={3}>
      <Heading size={["md"]}>
        <ListIcon as={FiAlertTriangle} color="yellow.400" />
        <Text as="kbd">Consideraciones</Text>
      </Heading>
      {listItems.map((item, index) => (
        <Content key={index} item={item} />
      ))}

      {options && options.length > 0 && (
        <>
          <Divider p={2} />
          <Heading size={["md"]}>
            <ListIcon as={FiAlertCircle} color="teal.500" />
            <Text as="kbd">Opciones</Text>
          </Heading>
          {options.map((item, index) => (
            <Content key={index} item={item} />
          ))}
        </>
      )}

      {examples?.success && examples.success.length > 0 && (
        <>
          <Divider p={2} />
          <Heading size={["md"]}>
            <ListIcon as={FiCheck} color="green.500" />
            <Text as="kbd">Correcto</Text>
          </Heading>
          {examples?.success.map((item, index) => (
            <Content key={index} item={item} />
          ))}
        </>
      )}

      {examples?.error && examples?.error.length > 0 && (
        <>
          <Divider />
          <Heading size="md">
            <ListIcon as={FiX} color="red.500" />
            <Text as="kbd">Incorrecto</Text>
          </Heading>
          {examples?.error.map((item, index) => (
            <Content key={index} item={item} />
          ))}
        </>
      )}
    </List>
  );
};

export const CONSTRAINTS = {
  precioVentaActivo: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Representa el monto total del bien o servicio a adquirir.",
            "Se debe introducir un valor positivo.",
            "El valor introducido no puede tener m??s de 2 cifras decimales.",
            "No se debe introducir la unidad monetaria.",
          ],
          examples: {
            success: ["12500.50", "230.15"],
            error: ["1000,00", "-200.00"],
          },
        }}
      />
    </>
  ),
  nDeAnios: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es el tiempo que se escogi?? para cancelar el pr??stamo solicitado.",
            "No puede tener decimales.",
            "Es un valor positivo.",
          ],
          examples: {
            success: ["4", "11"],
            error: ["-2", "-2.5"],
          },
        }}
      />
    </>
  ),
  frecuenciaDePago: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es la cantidad de d??as que entre cada pago a realizar dentro del n??mero de a??os.",
          ],
          options: [
            "Diario: 1 d??a",
            "Semanal: 7 d??as",
            "Quincenal: 15 d??as",
            "Mensual: 30 d??as",
            "Bimestral: 60 d??as",
            "Trimestral: 90 d??as",
            "Cuatrimestral: 120 d??as",
            "Semestral: 180 d??as",
            "Anual: 360 d??as",
          ],
        }}
      />
    </>
  ),
  nDiasPorAnio: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es la cantidad de d??as a considerar en el a??o dentro de una operaci??n",
            "Puede ser un a??o exacto (365 d??as) o a??o ordinario (360 d??as)",
            "En caso de operaci??n en entidades financieras es obligatorio el uso del a??o ordinario.",
          ],
        }}
      />
    </>
  ),
  porcentajeTEA: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es la acumulaci??n total de los intereses en un tiempo determinado en una operaci??n financiera.",
            "Es un valor positivo.",
            "Se debe introducir el valor sin ??l %.",
          ],
          examples: {
            success: ["2.50", "11.25"],
            error: ["0.1125", "2.50%", "-1.50"],
          },
        }}
      />
    </>
  ),
  porcentajeImpuestoALaRenta: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es un tributo a pagar definido por un pa??s",
            "Se calcula en base a UIT, para el a??o 2022 en Per??, cada UIT vale S/4400",
            "Equivalencia del impuesto a la renta en base al valor del activo",
            "Se debe introducir sin el s??mbolo del %",
          ],
          options: [
            "0 - 5 UIT = 8%",
            "5 - 20 UIT = 14%",
            "20 - 35 UIT = 17%",
            "35 - 45 UIT = 20%",
            "45 a m??s UIT = 30%",
          ],
        }}
      />
    </>
  ),
  porcentajeRecompra: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es el monto a cancelar proveniente del precio de venta",
            "Se debe introducir el valor sin el signo del %",
            "Es un valor positivo",
          ],
          examples: {
            success: ["12.00", "1.50"],
            error: ["1,20"],
          },
        }}
      />
    </>
  ),
  costesNotariales: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es un pago respecto a los honorarios del notario, derechos e impuestos que sean consecuencia de una operaci??n financiera.",
            "Se debe introducir como un valor positivo al programa.",
            "No puede tener m??s de 2 decimales.",
          ],
          examples: {
            success: ["140.00", "22.50"],
            error: ["140,00", "22.555"],
          },
        }}
      />
    </>
  ),
  costesRegistrales: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es el valor a pagar en la Oficina de Registros p??blicos.",
            "Se debe introducir como un valor positivo al programa.",
          ],
          examples: {
            success: ["16.50", "20.25"],
            error: ["240.355", "-230.00"],
          },
        }}
      />
    </>
  ),
  tasacion: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es un valor positivo.",
            "Es el gasto generado por la contrataci??n de especialistas en reglas y t??cnicas para establecer el valor del bien en la operaci??n financiera.",
          ],
          examples: {
            success: ["29.50", "100.00"],
            error: ["-29.50", "-150.322"],
          },
        }}
      />
    </>
  ),
  comisionDeEstudio: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Porcentaje que puede cobrar una entidad financiera, al inicio de la operaci??n.",
            "Se debe introducir como un valor positivo al programa.",
            "Puede ser 0.",
          ],
          examples: {
            success: ["25.00", "0.05"],
            error: ["-2.50", "0.252"],
          },
        }}
      />
    </>
  ),
  comisionDeActivacion: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es el monto a pagar proveniente del precio de venta para iniciar la operaci??n financiera.",
            "Es un valor positivo",
            "No puede tener m??s de 2 decimales.",
          ],
          examples: {
            success: ["5.00", "1.50"],
            error: ["1,20", "22.555"],
          },
        }}
      />
    </>
  ),
  comisionPeriodica: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es el valor a gasto acumulado dentro de un periodo de tiempo determinado",
            "Se debe introducir como un valor positivo al programa.",
          ],
          examples: {
            success: ["32.00", "20.00"],
            error: ["-120.00", "-100.00"],
          },
        }}
      />
    </>
  ),
  porcentajeDeSeguroRiesgo: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es una protecci??n a pagar, que garantiza al usuario recuperar el activo a de la operaci??n financiera.",
            "Se debe introducir el valor sin el signo %.",
            "El valor debe ser positivo.",
          ],
          examples: {
            success: ["5.50", "0.50"],
            error: ["0,50", "-25"],
          },
        }}
      />
    </>
  ),
  tasaDescuentoKS: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es el inter??s para calcular el valor de flujos de caja a futuro de un pr??stamo respecto costo de capital de las acciones comunes",
            "Es un valor positivo",
            "Se debe introducir el valor sin el singo del %",
          ],
          examples: {
            success: ["12.50", "0.70"],
            error: ["5,50", "0.0450"],
          },
        }}
      />
    </>
  ),
  tasaDescuentoWACC: (
    <>
      <ListWrapper
        contraints={{
          listItems: [
            "Es el inter??s para calcular el valor de flujos de caja a futuro de un pr??stamo respecto al costo de capital de las acciones comunes.",
            "Es un valor positivo.",
            "Se debe introducir el valor sin el singo del %.",
          ],
          examples: {
            success: ["10.00", "7.20"],
            error: ["13,20", "0.085"],
          },
        }}
      />
    </>
  ),
};
