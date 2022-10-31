import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Link,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiSettings, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactNode, ReactText } from "react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
}
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Inicio", path: "/", icon: FiHome },
  { name: "Mis Leasings", path: "/list", icon: FiTrendingUp },
  { name: "Editar Perfil", path: "/edit", icon: FiSettings },
];

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        my={8}
      >
        <Box>
          <img
            src="/logo-finanzas-removebg-preview.png"
            alt=""
            style={{ maxWidth: "100%" }}
          />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link as={ReactRouterLink} to={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor={isActive ? "" : "pointer"}
        style={
          isActive
            ? {
                backgroundColor: useColorModeValue("#2c7a7b", "#3182ce"),
                color: useColorModeValue("white", ""),
              }
            : undefined
        }
        _hover={{
          bg: useColorModeValue("teal.400", "blue.400"),
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize={["md", "xl"]}
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Designed and Developed by Patrick 💸
      </Text>
    </Flex>
  );
};

export default Sidebar;
