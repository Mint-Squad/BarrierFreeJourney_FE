import React, { useState } from "react";
import styled from "styled-components";

const interestList = [
  "맛집탐방",
  "전시",
  "문화유산",
  "예쁜 카페",
  "랜드마크",
  "자연",
  "쇼핑",
  "건축",
  "경관",
  "스포츠 관람",
  "공연/관람",
  "액티비티",
  "종교",
  "시장",
  "번화가",
];

const moodList = [
  "로컬",
  "여유로운",
  "모험적인",
  "활기찬",
  "낭만적인",
  "북적이는",
];

export const Interest = ({
  selectedInterest,
  setSelectedInterest,
  selectedMood,
  setSelectedMood,
  setStep,
}) => {
  const toggleInterest = (item) => {
    setSelectedInterest((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleMood = (item) => {
    setSelectedMood((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <InterestWrapper>
      <PlanningTitle>관심사가 어떻게 되세요?</PlanningTitle>

      <SelectInterest>
        <Text>관심사 선택</Text>
        <Description>3개 이상 선택해주세요</Description>

        <Grid>
          {interestList.map((item) => (
            <Button
              key={item}
              onClick={() => toggleInterest(item)}
              $selected={selectedInterest.includes(item)}
            >
              {item}
            </Button>
          ))}
        </Grid>
      </SelectInterest>

      <Line />

      <SelectMood>
        <Text>선호 분위기 선택</Text>
        <Grid>
          {moodList.map((item) => (
            <Button
              key={item}
              onClick={() => toggleMood(item)}
              $selected={selectedMood.includes(item)}
            >
              {item}
            </Button>
          ))}
        </Grid>
      </SelectMood>

      <ButtonWrapper>
        <PrevButton onClick={() => setStep((prevStep) => prevStep - 1)}>
          이전
        </PrevButton>
        <NextButton
          $enabled={selectedInterest.length >= 3 && selectedMood.length >= 1}
          onClick={() => setStep((prevStep) => prevStep + 1)}
        >
          다음
        </NextButton>
      </ButtonWrapper>
    </InterestWrapper>
  );
};

const InterestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const PlanningTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.2;
`;

const SelectInterest = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #627079;
`;

const Grid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Button = styled.button`
  padding: 1rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.$selected ? "#C2F6D7" : "#fff")};
  color: ${(props) => (props.$selected ? "#000" : "#627079")};
  cursor: pointer;
`;

const Line = styled.div`
  height: 1px;
  background-color: #e0e6e8;
`;

const SelectMood = styled.div`
  margin-bottom: 6rem;
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
