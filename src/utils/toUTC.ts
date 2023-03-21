export default function toUTC(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return Date.UTC(year, month, dayOfMonth);
}
