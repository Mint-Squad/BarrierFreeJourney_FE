import React from "react";
import styled from "styled-components";
import Checked from "../../assets/checked.svg?react";
import UnChecked from "../../assets/unchecked.svg?react";

export const PlaceList = ({
  candidates,
  selectedCandidates,
  setSelectedCandidates,
}) => {
  return (
    <PlaceListWrapper>
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
              <p>{candidate.name}</p>
              <p>{candidate.address}</p>
              <p>평점 {candidate.rating}</p>
              <p>#{candidate.searched_mood}</p>
            </PlaceName>
          </PlaceItem>
        );
      })}
    </PlaceListWrapper>
  );
};

const PlaceListWrapper = styled.ul`
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
