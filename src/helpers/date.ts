export function makeDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

export function isSameDay(dt1: Date, dt2: Date): boolean {
  if (dt1.getFullYear() !== dt2.getFullYear()) return false;
  if (dt1.getMonth() !== dt2.getMonth()) return false;
  if (dt1.getDate() !== dt2.getDate()) return false;
  return true;
}
