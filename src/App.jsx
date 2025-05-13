import { RouterProvider } from "react-router-dom";
import "./reset.css";
import router from "./Router";
import styled from "styled-components";

function App() {
  return (
    <ApContainer>
      <RouterProvider router={router} />
    </ApContainer>
  );
}

export default App;

const ApContainer = styled.div``;
