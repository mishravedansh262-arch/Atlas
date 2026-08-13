import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Roadmap from "../pages/roadmap/Roadmap";
import Projects from "../pages/projects/Projects";
import ProjectDetail from "../pages/projects/ProjectDetail";
import Tasks from "../pages/tasks/Tasks";
import Analytics from "../pages/analytics/Analytics";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";
import NotFound from "../pages/NotFound";
import { ProtectedRoute, PublicRoute } from "./guards";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/roadmap",
            element: <Roadmap />,
          },
          {
            path: "/projects",
            element: <Projects />,
          },
          {
            path: "/projects/:id",
            element: <ProjectDetail />,
          },
          {
            path: "/tasks",
            element: <Tasks />,
          },
          {
            path: "/analytics",
            element: <Analytics />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
