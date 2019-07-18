import { strPad2 } from './time';

export function makeDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

export function isSameDay(dt1: Date, dt2: Date): boolean {
  if (dt1.getFullYear() !== dt2.getFullYear()) return false;
  if (dt1.getMonth() !== dt2.getMonth()) return false;
  if (dt1.getDate() !== dt2.getDate()) return false;
  return true;
}

export function getWeekStartDate(dt: Date): Date {
  dt = new Date(dt.getTime()); // clone
  const diff = dt.getDate() - dt.getDay() + 1;
  return new Date(dt.setDate(diff));
}

export function getWeekEndDate(dt: Date): Date {
  dt = new Date(dt.getTime()); // clone
  const diff = dt.getDate() - dt.getDay() + 7;
  return new Date(dt.setDate(diff));
}

export function dateToStr(dt: Date): string {
  return `${dt.getFullYear()}.${strPad2(dt.getMonth() + 1)}.${strPad2(
    dt.getDate()
  )}`;
}
