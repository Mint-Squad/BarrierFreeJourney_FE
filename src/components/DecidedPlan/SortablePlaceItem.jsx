import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from "../../assets/drag_handle_icon.svg?react";
import styled from "styled-components";
import { formatTimeDifference } from "../../utils/formatTimeDifference";

export const SortablePlaceItem = ({ item, index, planData, day }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    marginBottom: index + 1 !== planData[day - 1].items.length ? "0" : "2rem",
    // 고정된 높이를 설정하여 드래그 중 높이 변형 방지
    height: isDragging ? "auto" : undefined,
  };

  return (
    <Item ref={setNodeRef} style={style}>
      <Upper>
        <Left>
          <DragHandle {...attributes} {...listeners}>
            <DragHandleIcon />
          </DragHandle>
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
  );
};

const Item = styled.li`
  list-style: none;
  margin-bottom: 1rem;
`;

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
