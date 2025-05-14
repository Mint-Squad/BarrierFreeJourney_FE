import React from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import styled from "styled-components";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from "../../assets/drag_handle_icon.svg?react";

export const SortableCityItem = ({ city, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: city });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <CityItem ref={setNodeRef} style={style}>
      <DragHandle {...attributes} {...listeners}>
        <DragHandleIcon />
      </DragHandle>
      <span>{index + 1} 번째 도시</span>
      <CityTag>
        {city}
        <Remove onClick={() => onRemove(index)}>×</Remove>
      </CityTag>
    </CityItem>
  );
};

const CityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  padding: 0.5rem;

  &:active {
    cursor: grabbing;
  }
`;

const CityTag = styled.span`
  background-color: #f5f7f9;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const Remove = styled.span`
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.6rem;
  color: #627079;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.2s;
`;
