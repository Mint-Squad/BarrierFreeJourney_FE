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
import { SortableCityItem } from "./SortableCityItem";
import styled from "styled-components";

export const CityList = ({ activeId, setActiveId, cities, setCities }) => {
  const DragHandleIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="1.5" fill="#4E585F" />
      <circle cx="4" cy="8" r="1.5" fill="#4E585F" />
      <circle cx="4" cy="12" r="1.5" fill="#4E585F" />
      <circle cx="8" cy="4" r="1.5" fill="#4E585F" />
      <circle cx="8" cy="8" r="1.5" fill="#4E585F" />
      <circle cx="8" cy="12" r="1.5" fill="#4E585F" />
      <circle cx="12" cy="4" r="1.5" fill="#4E585F" />
      <circle cx="12" cy="8" r="1.5" fill="#4E585F" />
      <circle cx="12" cy="12" r="1.5" fill="#4E585F" />
    </svg>
  );

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

  const handleRemoveCity = (index) => {
    const updated = [...cities];
    updated.splice(index, 1);
    setCities(updated);
  };

  // DnD 이벤트 핸들러
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCities((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CityListWrapper>
        <SortableContext items={cities} strategy={verticalListSortingStrategy}>
          {cities.map((city, index) => (
            <SortableCityItem
              key={city}
              city={city}
              index={index}
              onRemove={handleRemoveCity}
            />
          ))}
        </SortableContext>
      </CityListWrapper>

      <DragOverlay adjustScale style={{ transformOrigin: "0 0" }}>
        {activeId ? (
          <CityItem
            style={{
              background: "#f0f0f0",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <DragHandle>
              <DragHandleIcon />
            </DragHandle>
            <span>{cities.indexOf(activeId) + 1} 번째 도시</span>
            <CityTag>{activeId}</CityTag>
          </CityItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const CityListWrapper = styled.div`
  touch-action: none;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 6rem;
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

const CityTag = styled.span`
  background-color: #f5f7f9;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
