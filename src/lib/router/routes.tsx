import type { PathRouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import Login from "lib/pages/login";
import Signup from "lib/pages/signup";
import UserProfileEdit from "lib/pages/profile";
import LeasingList from "lib/pages/list";
import { ThemeProvider } from "../pages/list/context/ThemeProvider";

export const routes: Array<PathRouteProps> = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list",
    element: (
      <ThemeProvider>
        <LeasingList />
      </ThemeProvider>
    ),
  },
  {
    path: "/edit",
    element: <UserProfileEdit />,
  },
];
