import React, { useEffect, useRef, useState } from "react";
import { formatTimeDifference } from "../utils/formatTimeDifference";
import { getSortedScheduleByLatestVersion } from "../utils/groupAndSortScheduleItemsByDate";

import styled from "styled-components";
import PrevArrow from "../assets/prev_arrow.svg?react";
import NextArrow from "../assets/next_arrow.svg?react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortablePlaceItem } from "../components/DecidedPlan/SortablePlaceItem";
import DragHandleIcon from "../assets/drag_handle_icon.svg?react";

export const DecidedPlan = () => {
  const [day, setDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [planData, setPlanData] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isGet, setIsGet] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function injectPlaceIdAndClean(planData) {
    return planData.map((dayPlan) => ({
      ...dayPlan,
      items: dayPlan.items.map((item) => {
        const newItem = {
          ...item,
          place_id: item.place?.place_id || null,
        };
        delete newItem.place;
        delete newItem.id;
        return newItem;
      }),
    }));
  }

  const patchPlanData = async () => {
    try {
      const request_id = localStorage.getItem("request_id");
      const version_id = localStorage.getItem("version_id");
      const planWithPlaceId = injectPlaceIdAndClean(planData).flatMap(
        (plan) => plan.items
      );

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/travel/schedule/${request_id}/${version_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: planWithPlaceId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error");
      }

      console.log("[patchPlanData] response:", data);

      // ✅ 아래는 주석 처리하거나 완전히 삭제
      // setPlanData(data); ❌ 구조가 맞지 않음
    } catch (error) {
      console.error("Error", error);
    }
  };

  // DnD event handlers
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem(
      planData[day - 1].items.find((item) => item.id === active.id)
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPlanData((currentPlanData) => {
        const updatedPlanData = [...currentPlanData];
        const currentDayItems = [...updatedPlanData[day - 1].items];

        const oldIndex = currentDayItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = currentDayItems.findIndex(
          (item) => item.id === over.id
        );

        // ✅ 시작/종료 시간 스왑
        const tempStart = currentDayItems[oldIndex].start_time;
        const tempEnd = currentDayItems[oldIndex].end_time;
        currentDayItems[oldIndex].start_time =
          currentDayItems[newIndex].start_time;
        currentDayItems[oldIndex].end_time = currentDayItems[newIndex].end_time;
        currentDayItems[newIndex].start_time = tempStart;
        currentDayItems[newIndex].end_time = tempEnd;

        // ✅ 순서 바꾸기
        updatedPlanData[day - 1].items = arrayMove(
          currentDayItems,
          oldIndex,
          newIndex
        );

        patchPlanData(); // 파라미터는 내부에서 재계산하고 있으니 안 넘겨도 됨
        return updatedPlanData;
      });
    }

    setActiveItem(null);
  };

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
      console.log(data);
      localStorage.setItem(
        "version_id",
        data.schedules[data.schedules.length - 1].version
      );
      const sortedPlan = getSortedScheduleByLatestVersion(data);
      console.log(sortedPlan);
      setPlanData(sortedPlan);
      setDay(1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // ✅ Uncomment the following line to fetch real data
    getGeminiedPlan();
    setIsLoading(false); // For testing with mock data
    setIsGet(true);
  }, []);

  // Generate unique IDs for each item if they don't already have one
  useEffect(() => {
    const updatedPlanData = planData.map((dayPlan) => ({
      ...dayPlan,
      items: dayPlan.items.map((item, index) => ({
        ...item,
        id: item.id || `item-${dayPlan.day}-${index}`,
      })),
    }));

    setPlanData(updatedPlanData);
  }, []);

  const handlePrev = () => {
    if (day > 1) {
      setDay(day - 1);
    }
  };

  const handleNext = () => {
    if (day < planData.length) {
      setDay(day + 1);
    }
  };

  // Ensure we have plan data for the current day
  const currentDayItems = planData[day - 1]?.items || [];
  const itemIds = currentDayItems.map((item) => item.id);

  return (
    <DecidedPlanWrapper>
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

      {isLoading ? (
        <Loading>로딩 중...</Loading>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <DetailList>
            <SortableContext
              items={itemIds}
              strategy={verticalListSortingStrategy}
            >
              {currentDayItems.map((item, index) => (
                <SortablePlaceItem
                  key={item.id}
                  item={item}
                  index={index}
                  planData={planData}
                  day={day}
                />
              ))}
            </SortableContext>
          </DetailList>

          <DragOverlay adjustScale={false} style={{ transformOrigin: "0 0" }}>
            {activeItem ? (
              <PlaceItem
                style={{
                  background: "#f0f0f0",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <Upper>
                  <Left>
                    <DragHandle>
                      <DragHandleIcon />
                    </DragHandle>
                    <Index>
                      {currentDayItems.findIndex(
                        (item) => item.id === activeItem.id
                      ) + 1}
                    </Index>
                    <Info>
                      <Name>{activeItem.place.name}</Name>
                      <Address>{activeItem.place.address}</Address>
                    </Info>
                  </Left>
                  <Right></Right>
                </Upper>
                {currentDayItems.findIndex(
                  (item) => item.id === activeItem.id
                ) +
                  1 !==
                  currentDayItems.length && (
                  <Lower>
                    <div />
                    <div />
                    <div>
                      {activeItem.transport_type}{" "}
                      {formatTimeDifference(
                        activeItem.end_time,
                        currentDayItems[
                          currentDayItems.findIndex(
                            (item) => item.id === activeItem.id
                          ) + 1
                        ]?.start_time
                      )}
                    </div>
                  </Lower>
                )}
              </PlaceItem>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </DecidedPlanWrapper>
  );
};

const DecidedPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-inline: 2rem;
  background: var(--Gray-5, #f5f7f9);

  height: 100vh;
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

const PlaceItem = styled.div``;

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

const DragHandle = styled.div`
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  padding: 0.5rem;

  &:active {
    cursor: grabbing;
  }
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.6rem;
`;
