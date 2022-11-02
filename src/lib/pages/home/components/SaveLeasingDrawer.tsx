import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";

const SaveLeasingDrawer = ({ isSaved, isSaving, handler }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const formik = useFormik({
    initialValues: {
      titulo: "",
    },
    onSubmit: (values) => {
      handler(values);
      onClose();
    },
    validate: (values) => {
      const errors: any = {};
      for (const [key, value] of Object.entries(values)) {
        if (!value) {
          errors[key] = "Requerido";
        }
      }
      return errors;
    },
  });

  return (
    <>
      <Button
        mt={[0, 0, 8]}
        minW={"200px"}
        gridColumnStart={1}
        gridColumnEnd={3}
        size="lg"
        isDisabled={isSaved}
        isLoading={isSaving}
        bg={"rgba(255,99,71,1)"}
        color={"white"}
        _hover={{
          bg: "rgba(255,99,71,.7)",
        }}
        onClick={onOpen}
      >
        Guardar
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField as any}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Guardar el leasing
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={formik.handleSubmit} id="my-form">
              <Stack spacing="24px">
                <FormControl isInvalid={Boolean(formik.errors.titulo)}>
                  <FormLabel htmlFor="titulo">Titulo</FormLabel>
                  <Input
                    ref={firstField as any}
                    id="titulo"
                    name="titulo"
                    value={formik.values.titulo}
                    onChange={formik.handleChange}
                    placeholder="Ingresa el título"
                    autoComplete="off"
                  />
                  {formik.errors.titulo && (
                    <FormErrorMessage>{formik.errors.titulo}</FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              bg={"rgba(255,99,71,1)"}
              color={"white"}
              _hover={{
                bg: "rgba(255,99,71,.7)",
              }}
            >
              Cancelar
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              form="my-form"
              isLoading={formik.isSubmitting}
            >
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SaveLeasingDrawer;
