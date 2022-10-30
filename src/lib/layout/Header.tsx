import { Box, Flex, IconButton } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../@auth/firebase/firebaseConfig";
import ThemeToggle from "./ThemeToggle";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  //	signout firebase auth
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
      <IconButton
        aria-label="signout button"
        icon={<FaSignOutAlt />}
        onClick={handleSignOut}
      />
    </Flex>
  );
};

export default Header;
