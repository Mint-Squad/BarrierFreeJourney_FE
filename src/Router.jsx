import { createBrowserRouter } from "react-router-dom";
import { Planning } from "./pages/Planning";
import { Candidate } from "./pages/Candidate";

const router = createBrowserRouter([
  { path: "/", element: <Planning /> },
  { path: "/candidate", element: <Candidate /> },
]);

export default router;
