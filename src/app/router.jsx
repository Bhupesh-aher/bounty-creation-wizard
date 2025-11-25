import { createBrowserRouter, Navigate } from "react-router-dom";
import BountyLayout from "../features/bounty/layout/BountyLayout";
import BasicsStep from "../features/bounty/components/steps/BasicsStep";
import RewardsStep from "../features/bounty/components/steps/RewardsStep";
import BackerStep from "../features/bounty/components/steps/BackerStep";
import ConfirmationScreen from "../features/bounty/components/ConfirmationScreen";
import ResultScreen from "../features/bounty/components/ResultScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/add-bounty/basics" replace />,
  },
  {
    path: "/add-bounty",
    element: <BountyLayout />,
    children: [
      { path: "basics", element: <BasicsStep /> },
      { path: "rewards", element: <RewardsStep /> },
      { path: "backer", element: <BackerStep /> },
    ],
  },

  // ⬇️ CONFIRMATION AND RESULT MUST BE OUTSIDE OF BountyLayout
  {
    path: "/add-bounty/confirmation",
    element: <ConfirmationScreen />,
  },
  {
    path: "/add-bounty/result",
    element: <ResultScreen />,
  },

  {
    path: "*",
    element: <Navigate to="/add-bounty/basics" replace />,
  },
]);
