import React from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/search.svg?react";

export const SelectCity = ({
  inputValue,
  setInputValue,
  cities,
  setCities,
}) => {
  const handleAddCity = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !cities.includes(trimmed)) {
      setCities([...cities, trimmed]);
    }
    setInputValue(""); // 입력 초기화
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddCity();
  };

  return (
    <SelectCityWrapper>
      <City>도시</City>
      <Description>드래그로 방문 순서를 수정할 수 있어요</Description>
      <InputWrapper>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="추가할 도시를 입력 및 선택 해주세요"
        />
        <SVGWrapper>
          <StyledSearch />
        </SVGWrapper>
      </InputWrapper>

      <AddButton onClick={handleAddCity} disabled={!inputValue.trim()}>
        도시 추가하기
      </AddButton>
    </SelectCityWrapper>
  );
};

const SelectCityWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const City = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #627079;
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

const AddButton = styled.button`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #c2f6d7;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #21825b;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #e9ecef;
    color: #a0a7ad;
    cursor: not-allowed;
  }
`;
