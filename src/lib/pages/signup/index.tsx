import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Link,
  Input,
  InputGroup,
  FormErrorMessage,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { FirebaseService } from "../../../firebase/services/firebase.service";
import { IAuthRegisterErrors } from "lib/interfaces/Auth";
import { getAuthRegisterErrors } from "../../../utils/authUtils";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "Patrick",
    lastName: "Cuentas",
    email: "patrick_cuentas3@hotmail.com",
    password: "patrick06cuentas",
    confirmPassword: "patrick06cuentas",
  });
  const [errorValues, setErrorValues] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
  });

  const {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
    password: passwordValue,
    confirmPassword: confirmPasswordValue,
  } = inputValues;
  const {
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = errorValues;
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    const registerErrors: IAuthRegisterErrors = getAuthRegisterErrors(
      emailValue,
      passwordValue,
      confirmPasswordValue
    );
    setErrorValues(registerErrors);

    const { email, password, confirmPassword } = registerErrors;
    if (email.error || password.error || confirmPassword.error) return;

    FirebaseService.registerUserWithEmailAndPassword(
      firstNameValue + " " + lastNameValue,
      emailValue,
      passwordValue
    ).then((isSuccess) => {
      if (isSuccess) navigate("/");
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={handleRegister}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Registrate
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              para conocer nuestras funcionalidades ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Nombres</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      value={firstNameValue}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Apellidos</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      value={lastNameValue}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired isInvalid={emailError.error}>
                <FormLabel>Correo</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={emailValue}
                  onChange={handleInputChange}
                />
                {emailError.error && (
                  <FormErrorMessage>{emailError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="password"
                isRequired
                isInvalid={passwordError.error}
              >
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={passwordValue}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {passwordError.error && (
                  <FormErrorMessage>{passwordError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="confirmPassword"
                isRequired
                isInvalid={confirmPasswordError.error}
              >
                <FormLabel>Repetir Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPasswordValue}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {confirmPasswordError.error && (
                  <FormErrorMessage>
                    {confirmPasswordError.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  style={{ color: "white" }}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Unirse
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Ya eres un usuario?{" "}
                  <Link color={"blue.400"} as={ReactRouterLink} to="/login">
                    Iniciar Sesión
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
