export function sample<T>(array: Array<T>, n: number): T[] {
  n = Math.floor(n);

  const results: T[] = [];

  for (let i = 0; i < n; i++) {
    results.push(array[Math.floor(Math.random() * array.length)]);
  }

  return results;
}

export function sampleOne<T>(array: Array<T>): T {
  return sample(array, 1)[0];
}

export function sampleOneIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}
export function getRandomDate(): Date {
  return new Date(+new Date() - Math.floor(Math.random() * 10000000000));
}

//Will return new Date instance
export function addHoursToDate(d: Date, h: number): Date {
  const date = new Date(d.getTime());
  date.setHours(date.getHours() + h);
  return date;
}
