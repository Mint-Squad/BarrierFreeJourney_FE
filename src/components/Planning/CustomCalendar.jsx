import React from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

export const CustomCalendar = ({ setDepartDate, setReturnDate }) => {
  return (
    <StyledCalendarWrapper>
      <div>
        {/* 출발 날짜 선택 전용 */}
        <StyledCalendar
          onChange={setDepartDate}
          formatDay={(locale, date) => String(date.getDate())}
          locale="ko-KR"
          calendarType="gregory"
        />

        <Line />

        {/* 도착 날짜 선택 전용 */}
        <StyledCalendar
          onChange={setReturnDate}
          formatDay={(locale, date) => String(date.getDate())}
          locale="ko-KR"
          calendarType="gregory"
        />
      </div>
    </StyledCalendarWrapper>
  );
};

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-bottom: 6rem;

  > div {
    border-radius: 1rem;
    border: 1px solid #e0e6e8;
    height: 350px; /* 원하는 고정 높이 (적절히 조절 가능) */
    overflow-y: auto;
  }
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 1rem;
    background-color: white;
    padding: 1.5rem 1rem;
  }

  /* 네비게이션 가운데 정렬 + 연/월 스타일 */
  .react-calendar__navigation {
    justify-content: center;
    margin-bottom: 1rem;

    button {
      font-size: 1.2rem;
      font-weight: bold;
      background: none;
      border: none;
      cursor: pointer;
    }

    button:disabled {
      color: #999;
    }
  }

  /* 요일 줄 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;

    abbr {
      text-decoration: none;
      color: #888;
    }
  }

  /* 일요일만 빨간색 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: red;
  }

  /* 날짜 타일 기본 */
  .react-calendar__tile {
    width: 32px;
    height: 32px;
    text-align: center;
    padding-top: 0.8rem;
    border-radius: 100%;
    font-weight: 500;
    font-size: 1rem;
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile--now {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto; /* 가운데 정렬 */
    border-radius: 50%;
    background-color: white;
    abbr {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px; /* 세로 가운데 정렬 */
      text-align: center;
      font-weight: bold;
      font-size: 1rem;
      background: rgba(0, 200, 100, 0.2); /* 예시 색상 */
      border-radius: 50%;
      color: #111;
      padding: 0; /* padding 제거 */
    }
  }

  /* 활성 날짜 (선택된 날짜) */
  .react-calendar__tile--active {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto; /* 가운데 정렬 */
    border-radius: 50%;
    background-color: white;
    abbr {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px; /* 세로 가운데 정렬 */
      text-align: center;
      font-weight: bold;
      font-size: 1rem;
      background: rgba(0, 200, 100, 0.8); /* 예시 색상 */
      border-radius: 50%;
      color: #111;
      padding: 0; /* padding 제거 */
    }
  }

  /* 호버 효과 */
  .react-calendar__tile:enabled:hover {
    background-color: white !important;
  }

  .react-calendar__tile--active:enabled:focus {
    background-color: white !important;
  }
`;

const Line = styled.div`
  height: 1px;
  background-color: #e0e6e8;
  margin-inline: 1.5rem;
`;

const StyledCalendar = styled(Calendar)`
  /* 전체 폰트 컬러 */
`;
