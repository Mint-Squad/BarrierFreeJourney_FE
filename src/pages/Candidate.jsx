import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/search.svg?react";
import { mockCandidate } from "../mock/mockCandidate";
import Checked from "../assets/checked.svg?react";
import UnChecked from "../assets/unchecked.svg?react";

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
  const [candidates, setCandidates] = useState(mockCandidate.candidates);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 찾아서 결과 리턴, 없으면 걍 없습니다.
    }
  };

  useLayoutEffect(() => {
    const getRecomendedCandidate = async () => {
      setIsLoading(true);
      try {
        const request_id = localStorage.getItem("request_id");
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/travel/schedule/candidates/${request_id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setCandidates(data.candidates);

        if (!response.ok) {
          throw new Error("Failed to fetch recommended candidates");
        }
      } catch (error) {
        console.error("Error fetching recommended candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // getRecomendedCandidate();
  }, []);

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

      <WantToAddPlace>
        <InputWrapper>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="추가하고 싶은 장소를 검색해보세요"
          />
          <SVGWrapper>
            <StyledSearch />
          </SVGWrapper>
        </InputWrapper>

        <PlaceList>
          {candidates.map((candidate) => {
            const isSelected = selectedCandidates.includes(candidate.place_id);

            const toggleCandidate = () => {
              if (isSelected) {
                setSelectedCandidates((prev) =>
                  prev.filter((id) => id !== candidate.place_id)
                );
              } else {
                setSelectedCandidates((prev) => [...prev, candidate.place_id]);
              }
            };

            return (
              <PlaceItem key={candidate.place_id} onClick={toggleCandidate}>
                <CheckWrapper>
                  {isSelected ? <Checked /> : <UnChecked />}
                </CheckWrapper>
                <ImgWrapper>
                  <img src={candidate.image_url || null} alt={candidate.name} />
                </ImgWrapper>
                <PlaceName>
                  <p>{candidate.place_name}</p>
                  <p>{candidate.address}</p>
                  <p>평점 {candidate.rating}</p>
                  {/* <p>{candidate.category}</p> */}
                </PlaceName>
              </PlaceItem>
            );
          })}
        </PlaceList>
      </WantToAddPlace>

      <ButtonWrapper>
        <NextButton>
          총 <span>{selectedCandidates.length}</span> 개 선택 완료
        </NextButton>
      </ButtonWrapper>
    </CandidateWrapper>
  );
};

const CandidateWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const WantToAddPlace = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 9rem;
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 1rem 0;
  padding: 1.2rem;
  background-color: #f5f7f9;
  border-radius: 0.5rem;

  > input {
    width: 24rem;
    background-color: transparent;
    border: none;
    color: #4e585f;
    font-weight: 500;
    font-size: 1.4rem;

    &::placeholder {
      color: #a0a7ad;
    }
  }
`;

const SVGWrapper = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const StyledSearch = styled(SearchIcon)``;

const PlaceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const PlaceItem = styled.li`
  display: flex;
  align-items: center;
`;

const CheckWrapper = styled.div`
  margin-right: 0.8rem;
`;

const ImgWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  aspect-ratio: 1/1;
  border-radius: 0.2rem;
  background: #d9d9d9;
  margin-right: 1.6rem;
`;

const PlaceName = styled.div`
  :first-child {
    color: #000;
    font-family: Pretendard;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 2.16rem */
  }

  :not(:first-child) {
    color: #4e585f;
    font-family: Pretendard;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 1.44rem */
  }
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
