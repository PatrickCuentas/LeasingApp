import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

// Services
import { FirebaseService } from "../../@auth/firebase/firebase.service";

// Others
import { useFormik } from "formik";

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
          <FormControl
            isInvalid={
              Boolean(formik.errors.displayName) && formik.touched.displayName
            }
          >
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
            {Boolean(formik.errors.displayName) && (
              <FormErrorMessage>{formik.errors.displayName}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={Boolean(formik.errors.email) && formik.touched.email}
          >
            <FormLabel htmlFor="email">Correo electr??nico</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              id="email"
              name="email"
              type="email"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={
              Boolean(formik.errors.password) && formik.touched.password
            }
          >
            <FormLabel>Contrase??a</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              id="password"
              name="password"
              type="password"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            bg={useColorModeValue("#2c7a7b", "#3182ce")}
            style={{ color: "white", marginTop: "30px" }}
            w="full"
            _hover={{
              bg: useColorModeValue("teal.400", "blue.400"),
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
