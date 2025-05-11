export const getNightsDays = (departDate, returnDate) => {
  if (departDate && returnDate) {
    const diffTime = returnDate.getTime() - departDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `총 ${diffDays}박 ${diffDays + 1}일`;
  }
  return "총 0박 0일";
};
