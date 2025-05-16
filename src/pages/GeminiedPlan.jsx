import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyMapComponent from "../components/GeminiPlan/MyMap";
import PrevArrow from "../assets/prev_arrow.svg?react";
import NextArrow from "../assets/next_arrow.svg?react";
import { mockGeminied } from "../mock/mockGeminied";
import { formatTimeDifference } from "../utils/formatTimeDifference";
import { getSortedScheduleByLatestVersion } from "../utils/groupAndSortScheduleItemsByDate";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";

export const GeminiedPlan = () => {
  const [day, setDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [planData, setPlanData] = useState([]);
  const navigate = useNavigate();

  const getGeminiedPlan = async () => {
    setIsLoading(true);
    try {
      const request_id = localStorage.getItem("request_id");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/travel/schedule/${request_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const sortedPlan = getSortedScheduleByLatestVersion(data);
      setPlanData(sortedPlan);
      setDay(1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // ✅ 아래 주석 지우고 함수 부르기
    getGeminiedPlan();
  }, []);

  const handlePrev = () => {
    if (day > 1) {
      setDay(day - 1);
    }
    console.log(planData[0].items);
  };

  const handleNext = () => {
    if (day < planData.length) {
      setDay(day + 1);
    }
  };

  const onClickRetry = async () => {
    setIsLoading(true);
    try {
      const request_id = localStorage.getItem("request_id");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/travel/schedule`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ travel_request: Number(request_id) }),
        }
      );

      const data = await response.json();
      console.log(data);
      localStorage.setItem("version_id", data.schedule.version);

      if (!response.ok) {
        throw new Error("Error");
      }

      // ✅ 아래 주석 지우고 함수 부르기
      await getGeminiedPlan();
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <GeminiedPlanWrapper>
      <Title>플랜 추천</Title>

      <Day>
        <Wrapper>
          <p>여행</p>
          <div>
            <StyledPrevArrow onClick={handlePrev} disabled={day === 1} />
            <p>{day} 일차</p>
            <StyledNextArrow
              onClick={handleNext}
              disabled={day === planData.length}
            />
          </div>
        </Wrapper>
        <Description>경로, 순서는 추후 변경이 가능합니다.</Description>
      </Day>

      <DetailList>
        {planData[day - 1].items.map((item, index) => (
          <Item key={index}>
            <Upper>
              <Left>
                <Index>{index + 1}</Index>
                <Info>
                  <Name>{item.place.name}</Name>
                  <Address>{item.place.address}</Address>
                </Info>
              </Left>
              <Right></Right>
            </Upper>
            {index + 1 !== planData[day - 1].items.length && (
              <Lower>
                <div />
                <div />
                <div>
                  {item.transport_type}{" "}
                  {formatTimeDifference(
                    planData[day - 1].items[index].end_time,
                    planData[day - 1].items[index + 1].start_time
                  )}
                </div>
              </Lower>
            )}
          </Item>
        ))}
      </DetailList>

      <ButtonWrapper>
        <p>AI가 일차적으로 생성했어요. 이걸로 저장할까요?</p>
        <div>
          <button onClick={onClickRetry}>다시 추천받기</button>
          <button onClick={() => navigate("/decidedPlan")}>저장하기</button>
        </div>
      </ButtonWrapper>
    </GeminiedPlanWrapper>
  );
};

const GeminiedPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-inline: 2rem;
  background: var(--Gray-5, #f5f7f9);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`;

const Day = styled.div`
  margin-top: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    color: #000;
    font-family: Pretendard;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 2.88rem */
  }

  > div {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    > p {
      color: #0bb44f;
      font-family: Pretendard;
      font-size: 2rem;
      font-style: normal;
      font-weight: 500;
      line-height: 120%; /* 2.4rem */
    }
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #627079;
`;

const StyledPrevArrow = styled(PrevArrow)`
  cursor: pointer;
  > g > path {
    fill: ${(props) => (props.disabled ? "#D3D3D3" : "#32383C")};
  }
`;

const StyledNextArrow = styled(NextArrow)`
  cursor: pointer;
  > g > path {
    fill: ${(props) => (props.disabled ? "#D3D3D3" : "#32383C")};
  }
`;

const DetailList = styled.ul`
  margin-top: 3rem;
  margin-bottom: 15.5rem;
`;

const Item = styled.li``;

const Upper = styled.div`
  display: flex;
  padding: 1.6rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 0.6rem;
  background: #fff;
`;

const Lower = styled.div`
  display: flex;
  align-items: center;
  > div {
    &:first-child {
      width: 1rem;
      height: 6.8rem;
      border-right: 2px dashed #c2f6d7;
    }

    &:nth-child(2) {
      width: 0.5rem;
      height: 0.2rem;
      background-color: #c2f6d7;
    }

    &:nth-child(3) {
      display: flex;
      padding: 0.4rem 1rem;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      border-radius: 0.4rem;
      background: #c2f6d7;

      color: #000;
      font-family: Pretendard;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 500;
      line-height: 120%; /* 1.68rem */
    }
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Index = styled.div`
  color: var(--Primary-Green, #0bb44f);
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.92rem */
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Name = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 1.92rem */
`;
const Address = styled.div`
  color: var(--Gray-80, #32383c);
  font-family: Pretendard;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 1.44rem */
`;

const Right = styled.div``;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;

  padding-top: 1.4rem;
  padding-bottom: 4.9rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  border: 1px solid var(--Gray-30, #d0d8db);
  background: #fff;
  > p {
    color: var(--Gray-60, #627079);
    text-align: center;
    font-family: Pretendard;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 1.44rem */
  }

  > div {
    display: flex;
    gap: 0.7rem;
    justify-content: center;
    > button {
      &:first-child {
        display: flex;
        width: 16rem;
        height: 4.8rem;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border-radius: 0.4rem;
        border: 1px solid var(--Primary-Green, #0bb44f);
        background: #fff;

        color: var(--Primary-Green, #0bb44f);
        font-family: Pretendard;
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 120%; /* 1.92rem */
      }

      &:nth-child(2) {
        display: flex;
        width: 16rem;
        height: 4.8rem;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border-radius: 0.4rem;
        background: var(--Primary-Green, #0bb44f);
        border: none;

        color: #fff;
        font-family: Pretendard;
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 120%; /* 1.92rem */
      }
    }
  }
`;
