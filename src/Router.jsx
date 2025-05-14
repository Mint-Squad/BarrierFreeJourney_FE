import { createBrowserRouter } from "react-router-dom";
import { Planning } from "./pages/Planning";
import { Candidate } from "./pages/Candidate";
import { GeminiedPlan } from "./pages/GeminiedPlan";
import { DecidedPlan } from "./pages/DecidedPlan";

const router = createBrowserRouter([
  { path: "/", element: <Planning /> },
  { path: "/candidate", element: <Candidate /> },
  { path: "/geminiedplan", element: <GeminiedPlan /> },
  { path: "/decidedPlan", element: <DecidedPlan /> },
]);

export default router;
