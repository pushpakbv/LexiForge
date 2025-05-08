//-----------React-----------//
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//-----------Pages-----------//
import HomePage from "../pages/HomePage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import MarketplacePage from "../pages/MarketplacePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import ProjectPage from "../pages/ProjectPage.jsx";
import MinePage from "../pages/MinePage.jsx";
import InspectPage from "../pages/InspectPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "marketplace",
    element: <MarketplacePage />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: ":id",
    //     element: <ProjectPage />,
    //     errorElement: <ErrorPage />,
    //     children: [
    //       {
    //         path: "mine",
    //         element: <MinePage />,
    //         errorElement: <ErrorPage />,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    path: "project/:id",
    element: <ProjectPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "mine",
        element: <MinePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "inspect",
        element: <InspectPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <BaseTemplate />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <DashboardPage />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "earn",
  //       element: <EarnPage />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "swap",
  //       element: <SwapPage />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "buy",
  //       element: <BuyPage />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "rewards",
  //       element: <RewardsPage />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "settings",
  //       element: <SettingsPage />,
  //       errorElement: <ErrorPage />,
  //     },
  //   ],
  // },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
