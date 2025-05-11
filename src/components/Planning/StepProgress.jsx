// StepProgress.jsx
import styled from "styled-components";

export const StepProgress = ({ currentStep }) => {
  const steps = ["시간", "위치", "이동", "관심사"];

  return (
    <Wrapper>
      <Steps>
        {steps.map((label, index) => {
          const step = index + 1;
          const isActive = currentStep === step;
          return (
            <StepWrapper key={step}>
              <Circle>
                <Step $active={isActive}>{step}</Step>
                <Label $active={isActive}>{label}</Label>
              </Circle>

              {step < steps.length && <Line />}
            </StepWrapper>
          );
        })}
      </Steps>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`;

const Steps = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Step = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "black" : "#e0e0e0")};
  color: ${({ $active }) => ($active ? "white" : "#aaa")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 1.2rem;
`;

const Circle = styled.div`
  position: relative;
  width: 3.5rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: -1.5rem;
  margin: 0 0.4rem;
  font-size: 1.2rem;
  color: ${({ $active }) => ($active ? "#111" : "#999")};
`;

const Line = styled.div`
  width: 2.5rem;
  height: 1px;
  background-color: #ccc;
`;

const CloseIcon = styled.div`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;
