export function strPad2(number: number): string {
  if (number > 99) {
    throw new Error('Try to pad2 for number > 99. number=' + number);
  }

  if (number < 10) {
    return '0' + number;
  }
  return String(number);
}

export const secToTimeText = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 60);
  const secs = totalSeconds - hours * 60;
  return `${strPad2(hours)}:${strPad2(secs)}`;
};
