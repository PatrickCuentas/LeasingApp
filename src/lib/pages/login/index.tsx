import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FirebaseService } from "../../../firebase/services/firebase.service";
import { getAuthLoginErrors } from "../../../utils/authUtils";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { IAuthLoginErrors } from "lib/interfaces/Auth";
import { auth } from "../../../firebase";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
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
  });

  const { email: emailValue, password: passwordValue } = inputValues;
  const { email: emailError, password: passwordError } = errorValues;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleLogin = () => {
    // Your login logic here
    const loginErrors: IAuthLoginErrors = getAuthLoginErrors(
      emailValue,
      passwordValue
    );
    setErrorValues(loginErrors);
    if (!loginErrors?.email?.error && !loginErrors?.password?.error) {
      FirebaseService.loginUserWithEmailAndPassword(emailValue, passwordValue);
    }
  };

  if (auth.currentUser) {
    return <Navigate replace to="/" />;
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Ingresa a tu cuenta</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            y disfruta nuestras <Link color={"blue.400"}>funcionalidades</Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={emailError.error}>
              <FormLabel>Correo</FormLabel>
              <Input type="email" name="email" onChange={handleInputChange} />
              {emailError.error && (
                <FormErrorMessage>{emailError.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={passwordError.error}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
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

            <Stack spacing={10}>
              <Link
                color={"blue.400"}
                as={ReactRouterLink}
                to="/signup"
                textAlign="end"
              >
                Registrate ahora!
              </Link>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
