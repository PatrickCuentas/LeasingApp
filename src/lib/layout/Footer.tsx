import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
      minH={["3rem", "4rem"]}
    >
      <Text fontSize="xs">
        {new Date().getFullYear()} -{" "}
        <Link href="https://github.com/PatrickCuentas" isExternal>
          patrick.dev
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
