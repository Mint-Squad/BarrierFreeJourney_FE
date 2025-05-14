export function getSortedScheduleByLatestVersion(mockGeminied) {
  // 가장 높은 version을 가진 schedule 찾기
  const latestSchedule = mockGeminied.schedules.reduce((max, current) => {
    return current.version > max.version ? current : max;
  });

  // 그 schedule의 items를 날짜별로 그룹화하고 시간순으로 정렬
  const groupedByDate = latestSchedule.items.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  // 정렬된 결과 배열 반환
  const sortedGroupedArray = Object.entries(groupedByDate)
    .map(([date, items]) => ({
      date,
      items: items.sort((a, b) => a.start_time.localeCompare(b.start_time)),
    }))
    .sort((a, b) => a.date.localeCompare(b.date)); // 날짜 순 정렬

  return sortedGroupedArray;
}
