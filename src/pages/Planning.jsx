import { useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { When } from "../components/Planning/When";
import { Where } from "../components/Planning/Where";
import { How } from "../components/Planning/How";
import { Interest } from "../components/Planning/Interest";
import { PlanSummary } from "../components/Planning/PlanSummary";
import { StepProgress } from "../components/Planning/StepProgress";

export const Planning = () => {
  const [step, setStep] = useState(1);

  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [selecting, setSelecting] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("국내");
  const [selectedForeign, setSelectedForeign] = useState("대한민국");
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState([]);

  const [selectedTransportation, setSelectedTransportation] = useState([]);
  const [distance, setDistance] = useState(1);

  const [selectedInterest, setSelectedInterest] = useState([]);
  const [selectedMood, setSelectedMood] = useState([]);

  return (
    <PlanningWrapper>
      {step < 5 && <StepProgress currentStep={step} setStep={setStep} />}
      {step === 1 && (
        <When
          selecting={selecting}
          setDepartDate={setDepartDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          departDate={departDate}
          setSelecting={setSelecting}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <Where
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedForeign={selectedForeign}
          setSelectedForeign={setSelectedForeign}
          inputValue={inputValue}
          setInputValue={setInputValue}
          cities={cities}
          setCities={setCities}
          setStep={setStep}
        />
      )}

      {step === 3 && (
        <How
          selectedTransportation={selectedTransportation}
          setSelectedTransportation={setSelectedTransportation}
          distance={distance}
          setDistance={setDistance}
          setStep={setStep}
        />
      )}

      {step === 4 && (
        <Interest
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          setStep={setStep}
        />
      )}

      {step === 5 && (
        <PlanSummary
          selectedCountry={selectedCountry}
          selectedForeign={selectedForeign}
          departDate={departDate}
          returnDate={returnDate}
          selectedTransportation={selectedTransportation}
          distance={distance}
          selectedInterest={selectedInterest}
          cities={cities}
          selectedMood={selectedMood}
          setStep={setStep}
        />
      )}
    </PlanningWrapper>
  );
};

// 기존의 styled-components 코드는 그대로 사용하시면 됩니다

const PlanningWrapper = styled.div`
  display: flex;

  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
`;
