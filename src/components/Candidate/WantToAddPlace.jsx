import React from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/search.svg?react";
import { PlaceList } from "./PlaceList";

export const WantToAddPlace = ({
  inputValue,
  setInputValue,
  handleKeyDown,
  candidates,
  selectedCandidates,
  setSelectedCandidates,
}) => {
  return (
    <WantToAddPlaceWrapper>
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

      <PlaceList
        candidates={candidates}
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
    </WantToAddPlaceWrapper>
  );
};

const WantToAddPlaceWrapper = styled.div`
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
