import React from "react";
import styled from "styled-components";

const foreignCountries = [
  "미국",
  "일본",
  "프랑스",
  "영국",
  "독일",
  "이탈리아",
  "태국",
  "베트남",
  "호주",
  "캐나다",
];

export const SelectCountry = ({
  selectedCountry,
  setSelectedCountry,
  selectedForeign,
  setSelectedForeign,
}) => {
  return (
    <SelectCountryWrapper>
      <p>국가</p>
      <div>
        <CountryBox
          $isSelected={selectedCountry === "국내"}
          onClick={() => {
            setSelectedCountry("국내");
            setSelectedForeign("대한민국");
          }}
        >
          국내
        </CountryBox>
        <CountryBox
          $isSelected={selectedCountry === "해외"}
          onClick={() => setSelectedCountry("해외")}
        >
          해외
        </CountryBox>
      </div>

      {selectedCountry === "국내" ? (
        <StyledSelect disabled>
          <option>대한민국</option>
        </StyledSelect>
      ) : (
        <StyledSelect
          value={selectedForeign}
          onChange={(e) => setSelectedForeign(e.target.value)}
        >
          <option value="">국가를 선택해주세요</option>
          {foreignCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </StyledSelect>
      )}
    </SelectCountryWrapper>
  );
};

const SelectCountryWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  > p {
    font-size: 2rem;
    font-weight: 600;
  }
  > div {
    display: flex;
  }
`;

const CountryBox = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
  padding: 1rem 3rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  background-color: ${(props) => (props.$isSelected ? "#C2F6D7" : "#f5f7f9")};

  &:first-child {
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border: 1px solid #e0e6e8;
    border-right: none;
  }

  &:not(:first-child) {
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border: 1px solid #e0e6e8;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.2rem 2.5rem 1.2rem 1rem;
  font-size: 1.4rem;
  border: 1px solid #e0e6e8;
  border-radius: 0.5rem;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 2.5rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:disabled {
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
`;
