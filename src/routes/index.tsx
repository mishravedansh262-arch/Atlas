/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Spinner from "../components/ui/Spinner";
import { ProtectedRoute, PublicRoute } from "./guards";

// Lazy-loaded page components for code splitting
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Roadmap = lazy(() => import("../pages/roadmap/Roadmap"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const ProjectDetail = lazy(() => import("../pages/projects/ProjectDetail"));
const Tasks = lazy(() => import("../pages/tasks/Tasks"));
const Analytics = lazy(() => import("../pages/analytics/Analytics"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size={20} className="text-brand-400" />
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper><Home /></SuspenseWrapper>,
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
            element: <SuspenseWrapper><Login /></SuspenseWrapper>,
          },
          {
            path: "/register",
            element: <SuspenseWrapper><Register /></SuspenseWrapper>,
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
            element: <SuspenseWrapper><Dashboard /></SuspenseWrapper>,
          },
          {
            path: "/roadmap",
            element: <SuspenseWrapper><Roadmap /></SuspenseWrapper>,
          },
          {
            path: "/projects",
            element: <SuspenseWrapper><Projects /></SuspenseWrapper>,
          },
          {
            path: "/projects/:id",
            element: <SuspenseWrapper><ProjectDetail /></SuspenseWrapper>,
          },
          {
            path: "/tasks",
            element: <SuspenseWrapper><Tasks /></SuspenseWrapper>,
          },
          {
            path: "/analytics",
            element: <SuspenseWrapper><Analytics /></SuspenseWrapper>,
          },
          {
            path: "/profile",
            element: <SuspenseWrapper><Profile /></SuspenseWrapper>,
          },
          {
            path: "/settings",
            element: <SuspenseWrapper><Settings /></SuspenseWrapper>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>,
  },
]);
