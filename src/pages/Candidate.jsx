import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/search.svg?react";
import { mockCandidate } from "../mock/mockCandidate";
import { WantToAddPlace } from "../components/Candidate/WantToAddPlace";
import { useNavigate } from "react-router-dom";
import loading from "../assets/loading.json";
import Lottie from "lottie-react";
import Hangul from "hangul-js";

// ✅ TODO
// 1. 후보지 리스트 관심사에 따라서 필터링 구현하기 (이 필드가 필요할거같은데... 어떻게 하지??)

const interestsList = [
  "전체",
  "자연",
  "문화",
  "역사",
  "음식",
  "액티비티",
  "휴식",
  "쇼핑",
  "야경",
];

export const Candidate = () => {
  const [selectedInterest, setSelectedInterest] = useState("전체");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [toShow, setToShow] = useState([]);

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 찾아서 결과 리턴, 없으면 걍 없습니다.
    }
  };

  useEffect(() => {
    const getRecomendedCandidate = async () => {
      setIsLoading(true);
      try {
        const interest =
          selectedInterest !== "전체"
            ? `/?interest=${encodeURIComponent(selectedInterest)}`
            : "";
        const request_id = localStorage.getItem("request_id");
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/travel/schedule/candidates/${request_id}${interest}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setCandidates(data.candidates);
        setToShow(data.candidates);

        if (!response.ok) {
          throw new Error("Failed to fetch recommended candidates");
        }
      } catch (error) {
        console.error("Error fetching recommended candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // ✅ 여기서 아래 주석 해제하기
    getRecomendedCandidate();
  }, [selectedInterest]);

  useEffect(() => {
    if (inputValue !== "") {
      const filtered = candidates.filter(
        (candidate) => Hangul.search(candidate.name, inputValue) >= 0
      );

      setCandidates(filtered);
    } else {
      setCandidates(toShow);
    }
  }, [inputValue]);

  useEffect(() => {
    setIsLoading(true);
  }, [selectedInterest]);

  const onClickNextButton = async () => {
    try {
      const request_id = localStorage.getItem("request_id");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/travel/schedule/select/${request_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selected_place_ids: selectedCandidates,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Failed to save selected candidates");
      }

      try {
        const response2 = await fetch(
          `${import.meta.env.VITE_API_URL}/travel/schedule`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              travel_request: Number(request_id),
            }),
          }
        );

        const data2 = await response2.json();
        console.log(data2);
        if (!response2.ok) {
          throw new Error("Failed to save selected candidates");
        }

        navigate("/geminiedplan");
      } catch (error) {
        console.error("Error", error);
      }
    } catch (error) {
      console.error("Error saving selected candidates:", error);
    }
  };

  return (
    <CandidateWrapper>
      <Title>필수 여행지 후보</Title>

      <SelectWrapper>
        <Text>부산에서의 여행지 후보를 골라주세요</Text>
        <Select>
          {interestsList.map((interest) => (
            <Interest
              key={interest}
              onClick={() => setSelectedInterest(interest)}
              $selected={selectedInterest === interest}
            >
              {interest}
            </Interest>
          ))}
        </Select>
      </SelectWrapper>

      <WantToAddPlace
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyDown={handleKeyDown}
        candidates={candidates}
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />

      {isLoading && (
        <LottieContainer>
          <Lottie animationData={loading}></Lottie>
        </LottieContainer>
      )}

      <ButtonWrapper>
        <NextButton onClick={onClickNextButton}>
          총 <span>{selectedCandidates.length}</span> 개 선택 완료
        </NextButton>
      </ButtonWrapper>
    </CandidateWrapper>
  );
};

const CandidateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const LottieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Select = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  gap: 0.8rem;
`;

const Interest = styled.div`
  width: 100%;
  display: flex;
  padding: 0.8rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
  border-radius: 2rem;
  border: 1px solid ${(props) => (props.$selected ? "#0bb44f" : "#808E95")};
  color: ${(props) => (props.$selected ? "#0bb44f" : "black")};
`;

const Text = styled.p`
  margin-top: 3.2rem;
  color: #000;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 2.4rem */
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 2.9rem;
  right: 2rem;
  left: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 1.2rem 0;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  background-color: #0bb44f;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  > span {
    font-weight: 600;
  }
`;
