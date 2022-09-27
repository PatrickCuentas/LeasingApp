import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate("/");

  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <Grid gap={4} textAlign="center">
        <Heading>Page not Found</Heading>
        <Box maxWidth={[280, 400]} marginX="auto">
          <Image width={400} src="/assets/404 Error-rafiki.svg" />
          <Link fontSize="xs" href="https://stories.freepik.com/web" isExternal>
            Illustration by Freepik Stories
          </Link>
        </Box>
        <Box>
          <Text mb={4}>It&apos;s Okay!</Text>
          <Button onClick={handleBackToHome}>Let&apos;s Head Back</Button>
        </Box>
      </Grid>
    </Flex>
  );
};

export default Page404;
