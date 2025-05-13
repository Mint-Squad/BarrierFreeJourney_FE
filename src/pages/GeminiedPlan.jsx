import React from "react";
import styled from "styled-components";
import MyMapComponent from "../components/GeminiPlan/MyMap";

export const GeminiedPlan = () => {
  return (
    <GeminiedPlanWrapper>
      <Title>플랜 추천</Title>
    </GeminiedPlanWrapper>
  );
};

const GeminiedPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`;
