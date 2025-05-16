import React from "react";
import loading from "../assets/loading.json";
import styled from "styled-components";
import Lottie from "lottie-react";

export default function Loading() {
  return (
    <LoadingContainer>
      <Lottie animationData={loading}></Lottie>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
