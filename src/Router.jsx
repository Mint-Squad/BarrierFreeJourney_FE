import { createBrowserRouter } from "react-router-dom";
import { Planning } from "./pages/Planning";
import { Candidate } from "./pages/Candidate";
import { GeminiedPlan } from "./pages/GeminiedPlan";

const router = createBrowserRouter([
  { path: "/", element: <Planning /> },
  { path: "/candidate", element: <Candidate /> },
  { path: "/geminiedplan", element: <GeminiedPlan /> },
]);

export default router;
