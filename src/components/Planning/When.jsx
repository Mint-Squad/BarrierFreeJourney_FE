import styled from "styled-components";
import { CustomCalendar } from "./CustomCalendar";
import { getNightsDays } from "../../utils/getNightDays";
import { formatDate } from "../../utils/formatDate";

export const When = ({
  setDepartDate,
  returnDate,
  setReturnDate,
  departDate,
  setStep,
}) => {
  return (
    <WhenWrapper>
      <PlanningTitle>언제 여행할 계획인가요?</PlanningTitle>
      <DataWrapper>
        <SelectedDate>
          <p>출발 날짜</p>
          <p className="date">{formatDate(departDate)}</p>
        </SelectedDate>
        <SelectedDate>
          <p>도착 날짜</p>
          <p className="date">{formatDate(returnDate)}</p>
        </SelectedDate>
        <CalculatedDate>
          <p>{getNightsDays(departDate, returnDate)}</p>
        </CalculatedDate>
      </DataWrapper>

      <CustomCalendar
        departDate={departDate}
        returnDate={returnDate}
        setDepartDate={setDepartDate}
        setReturnDate={setReturnDate}
      />

      <ButtonWrapper>
        <NextButton
          enabled={departDate && returnDate}
          onClick={() => setStep((prevStep) => prevStep + 1)}
        >
          다음
        </NextButton>
      </ButtonWrapper>
    </WhenWrapper>
  );
};

const WhenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const PlanningTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.2;
`;

const DataWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SelectedDate = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: 500;
  line-height: 1.2;
  font-size: 1.2rem;
  background-color: #f5f7f9;
  border-radius: 0.5rem;
  padding: 1.2rem;

  > p {
    &.date {
      font-weight: 600;
      line-height: 1.2;
      font-size: 1.2rem;
      color: ${(props) => (props.active ? "#111" : "#627079")};
    }
  }
`;

const CalculatedDate = styled.div`
  width: 100%;
  font-weight: 600;
  line-height: 1.2;
  font-size: 1.6rem;
  padding: 1.2rem;
  color: #676767;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 2rem;
  left: 2rem;
  display: flex;
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
  background-color: ${(props) => (props.enabled ? "#0bb44f" : "#C2F6D7")};
  /* #000 */
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    !props.enabled &&
    `
    pointer-events: none;
  `}
`;
