import { useState } from "react";
import styled from "styled-components";
import { SelectCountry } from "./SelectCountry";
import { SelectCity } from "./SelectCity";
import { CityList } from "./CityList";

export const Where = ({
  selectedCountry,
  setSelectedCountry,
  selectedForeign,
  setSelectedForeign,
  inputValue,
  setInputValue,
  cities,
  setCities,
  setStep,
}) => {
  const [activeId, setActiveId] = useState(null);

  return (
    <WhereWrapper>
      <PlanningTitle>어느 장소를 여행할 계획인가요?</PlanningTitle>
      <SelectCountry
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedForeign={selectedForeign}
        setSelectedForeign={setSelectedForeign}
      />
      <Line />
      <SelectCity
        inputValue={inputValue}
        setInputValue={setInputValue}
        cities={cities}
        setCities={setCities}
      />

      <CityList
        activeId={activeId}
        setActiveId={setActiveId}
        cities={cities}
        setCities={setCities}
      />

      <ButtonWrapper>
        <PrevButton onClick={() => setStep((prevStep) => prevStep - 1)}>
          이전
        </PrevButton>
        <NextButton
          $enabled={cities.length > 0}
          onClick={() => setStep((prevStep) => prevStep + 1)}
        >
          다음
        </NextButton>
      </ButtonWrapper>
    </WhereWrapper>
  );
};

const WhereWrapper = styled.div``;

const PlanningTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.2;
`;

const Line = styled.div`
  margin: 3rem 0;
  height: 1px;
  background-color: #e0e6e8;
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
