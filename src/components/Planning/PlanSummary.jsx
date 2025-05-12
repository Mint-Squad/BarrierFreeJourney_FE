import React, { useState } from "react";
import styled from "styled-components";
import { getNightsDays } from "../../utils/getNightDays";
import { formatDate } from "../../utils/formatDate";

export const PlanSummary = ({
  selectedCountry,
  selectedForeign,
  departDate,
  returnDate,
  selectedTransportation,
  distance,
  selectedInterest,
  cities,
  selectedMood,
  setStep,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const CreatePlan = async () => {
    setIsLoading(true);
    try {
      // API call to create plan
      // await createPlanAPI();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/travel/request/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: selectedForeign,
            cities: cities,
            start_date: formatDate(departDate, "-"),
            end_date: formatDate(returnDate, "-"),
            transportation: [selectedTransportation],
            max_distance: distance,
            interests: selectedInterest,
            mood: selectedMood,
          }),
        }
      );

      const data = response.json();
      const travel_request_id = data.travel_request.id;
      localStorage.setItem("request_id", travel_request_id);
      if (!response.ok) {
        throw new Error("Failed to create plan");
      }

      console.log(data);
    } catch (error) {
      console.error("Error creating plan:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PlanSummaryWrapper>
      <Title>여행 플랜생성</Title>
      <SectionWrapper>
        <Section>
          <Row>
            <Label>장소</Label>
            <EditButton onClick={() => setStep(2)}>수정</EditButton>
          </Row>
          <Content>
            {selectedCountry}, {selectedForeign}
          </Content>
        </Section>

        <Section>
          <Row>
            <Label>시간</Label>
            <EditButton onClick={() => setStep(1)}>수정</EditButton>
          </Row>
          <Content>{`${formatDate(departDate)} ~ ${formatDate(
            returnDate
          )}, ${getNightsDays(departDate, returnDate)}`}</Content>
        </Section>

        <Section>
          <Row>
            <Label>이동계획</Label>
            <EditButton onClick={() => setStep(3)}>수정</EditButton>
          </Row>
          <Content>
            {selectedTransportation}, {distance}km 이동 가능
          </Content>
        </Section>

        <Section>
          <Row>
            <Label>관심사</Label>
            <EditButton onClick={() => setStep(4)}>수정</EditButton>
          </Row>
          <Content>{selectedInterest.join(", ")}</Content>
        </Section>
      </SectionWrapper>

      <ButtonWrapper>
        <NextButton $enabled={true} onClick={CreatePlan}>
          다음
        </NextButton>
      </ButtonWrapper>
    </PlanSummaryWrapper>
  );
};

const PlanSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionWrapper = styled.div`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
`;

const Section = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

const EditButton = styled.button`
  font-size: 1.3rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
`;

const Content = styled.p`
  font-size: 1.4rem;
  color: #222;
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
