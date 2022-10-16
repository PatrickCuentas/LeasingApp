import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FirebaseService } from "../../@auth/firebase/firebase.service";
import { useFormik } from "formik";
import Swal from "sweetalert2";

// const swalAsync = () => {
//   Swal.fire({
//     title: "¿Estás seguro?",
//     text: "No podrás revertir esta acción",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Sí, eliminar",
//     cancelButtonText: "Cancelar",
//   }).then((result) => {
//     console.log(result);
//     if (result.isConfirmed) {
//       Swal.fire("Actualizado!", "El perfil ha sido actualizado.", "success");
//     }
//   });
// };

export default function UserProfileEdit(): JSX.Element {
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const { displayName, email, password } = values;
      FirebaseService.updateUserProfile(displayName, email, password);
    },
    validate(values) {
      const errors: any = {};
      if (!values.displayName) {
        errors.displayName = "Required";
      } else if (values.displayName.length > 15) {
        errors.displayName = "Must be 15 characters or less";
      }

      // validar email
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      // validar password
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 6) {
        errors.password = "Must be 6 characters or more";
      }

      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.30", "gray.900")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Editar Perfil
          </Heading>
          <FormControl isRequired>
            <FormLabel htmlFor="displayName">Nickname</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              id="displayName"
              name="displayName"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.displayName}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Correo electrónico</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              id="email"
              name="email"
              type="email"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              id="password"
              name="password"
              type="password"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <Button
            bg={"blue.400"}
            style={{ color: "white", marginTop: "30px" }}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
          >
            Enviar
          </Button>
        </Stack>
      </Flex>
    </form>
  );
}
