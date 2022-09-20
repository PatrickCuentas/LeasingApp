import { Box, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Header from "./Header";
import Meta from "./Meta";

import Sidebar from "./Sidebar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // <Box margin="0 auto" maxWidth={1200} transition="0.5s ease-out">

  return (
    <Box transition="0.5s ease-out">
      <Flex wrap="wrap">
        <Meta />
        <Box width="full" as="main">
          <Sidebar>
            <Header />
            {children}
          </Sidebar>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
