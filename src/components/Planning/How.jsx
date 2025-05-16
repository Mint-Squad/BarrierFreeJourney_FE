import React, { useState } from "react";
import styled from "styled-components";

export const How = ({
  selectedTransportation,
  setSelectedTransportation,
  distance,
  setDistance,
  setStep,
}) => {
  return (
    <HowWrapper>
      <PlanningTitle>어떻게 이동할 계획인가요?</PlanningTitle>

      <MainTransportation>
        <p>주요 이동 수단</p>
        <div>
          {["대중교통", "택시", "자가용"].map((mode) => (
            <TransportationBox
              key={mode}
              $isSelectedTransportation={selectedTransportation === mode}
              onClick={() => setSelectedTransportation(mode)}
            >
              {mode}
            </TransportationBox>
          ))}
        </div>
      </MainTransportation>

      <Line />

      <MovingAbility>
        <Distance>자력으로 이동가능한 거리</Distance>
        <Description>
          위의 교통수단을 사용하지 않은 채 하루에 이동가능한 거리입니다.
        </Description>

        <DistanceWrapper>
          <StyledSelect
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </StyledSelect>
          <LabelText>KM 이내</LabelText>
        </DistanceWrapper>
      </MovingAbility>

      <ButtonWrapper>
        <PrevButton onClick={() => setStep((prevStep) => prevStep - 1)}>
          이전
        </PrevButton>
        <NextButton
          $enabled={selectedTransportation.length != 0}
          onClick={() => setStep((prevStep) => prevStep + 1)}
        >
          다음
        </NextButton>
      </ButtonWrapper>
    </HowWrapper>
  );
};

const HowWrapper = styled.div``;

const PlanningTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.2;
`;

const MainTransportation = styled.div`
  margin-top: 5rem;
  width: 100%;
  padding: 1rem 0;

  > p {
    font-size: 2rem;
    font-weight: 600;
  }

  > div {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;

const TransportationBox = styled.div`
  width: 100%;
  flex: 1;
  padding: 1.2rem;
  text-align: center;
  border-radius: 0.75rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isSelectedTransportation ? "#C2F6D7" : "white"};
  color: ${(props) => (props.$isSelectedTransportation ? "black" : "#627079")};
  border: 1px solid #e0e6e8;
  transition: background-color 0.2s ease;
`;

const Line = styled.div`
  margin: 2rem 0;
  height: 1px;
  background-color: #e0e6e8;
`;

const MovingAbility = styled.div`
  margin-bottom: 6rem;
`;

const Distance = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #627079;
`;

const DistanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
`;

const StyledSelect = styled.select`
  font-size: 1.6rem;
  padding: 1rem 0;
  padding-right: 3rem;
  border: 1px solid #e0e6e8;
  border-radius: 0.5rem;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 3rem;
  width: 11rem;
  text-align: center;
`;

const LabelText = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 2rem;
  left: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  background-color: white;
  padding: 1.2rem 0;
`;

const PrevButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #f5f7f9;
  color: #0bb44f;
  border: 1px solid #0bb44f;
  /* #000 */
  border-radius: 0.5rem;
  cursor: pointer;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: bold;
  background-color: ${(props) => (props.$enabled ? "#0bb44f" : "#C2F6D7")};
  /* #000 */
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    !props.$enabled &&
    `
    pointer-events: none;
  `}
`;
