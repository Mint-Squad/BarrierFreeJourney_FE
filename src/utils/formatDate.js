export const formatDate = (date, type = "-") => {
  if (!date) return "선택해주세요";

  const year = String(date.getFullYear()).slice(2); // YY
  const month = String(date.getMonth() + 1).padStart(2, "0"); // MM
  const day = String(date.getDate()).padStart(2, "0"); // DD
  if (type === "-") {
    return `${year}-${month}-${day}`;
  }
  return `${year}/${month}/${day}`;
};
