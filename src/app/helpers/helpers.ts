enum Desks {
  'Created',
  'To Do',
  'Done',
}

enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

interface CreatedData {
  rawDate: number;
  localString: string;
  day: number;
  dayOfWeek: string;
  month: string;
  year: number;
  hour: number;
  minutes: number;
}

function setCreatedData(tergetData: number): CreatedData {
  const myDate = new Date(tergetData);
  return {
    rawDate: tergetData,
    localString: myDate.toLocaleString(),
    day: myDate.getDate(),
    dayOfWeek: DayOfWeek[myDate.getDay()],
    month: Months[myDate.getMonth()],
    year: myDate.getFullYear(),
    hour: myDate.getHours(),
    minutes: myDate.getMinutes(),
  };
}

export { setCreatedData, CreatedData, Months, DayOfWeek, Desks };
