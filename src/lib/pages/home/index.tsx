import { Box, Text } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { auth } from "../../../firebase";

const Home = () => {
  const theme = useTheme();
  const user = auth?.currentUser?.displayName;

  return (
    <Box>
      <Text>Bienvenido de nuevo {user} 🌟🌟</Text>
    </Box>
  );
};

export default Home;
