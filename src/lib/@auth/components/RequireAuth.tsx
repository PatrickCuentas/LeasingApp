import { Box } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import { auth } from "../firebase/firebaseConfig";

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({
  children,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  const user = auth.currentUser;
  const [isAuthenticated, setIsAuthenticated] = useState(user ? true : false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
  }, [auth, user]);

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <GridLoader color="tomato" loading={loading} size={50} />
      </Box>
    );
  }

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
