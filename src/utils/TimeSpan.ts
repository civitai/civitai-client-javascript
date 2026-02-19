const ticksPerMillisecond = 10000,
  ticksPerSecond = 1000 * ticksPerMillisecond,
  ticksPerMinute = 60000 * ticksPerMillisecond,
  ticksPerHour = 3600000 * ticksPerMillisecond,
  ticksPerDay = 86400000 * ticksPerMillisecond;

const timeSpanWithDays = /^(\d+):(\d+):(\d+):(\d+).(\d+)?/,
  timeSpanNoDays = /^(\d+):(\d+):(\d+).(\d+)?/;

function toDoubleDigitString(n: number) {
  return `${n < 10 ? '0' + n : n}`;
}

export class TimeSpan {
  #ticks = 0;
  /**
   *
   * @param timeSpanString format "days:hours:minutes:seconds.ticks" ("00:00:00:00.000000")
   */
  constructor(timeSpanString: string);
  constructor(ticks: number);
  constructor(hours: number, minutes: number, seconds: number);
  constructor(days: number, hours: number, minutes: number, seconds: number);
  constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
  constructor(
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
    ticks: number
  );
  constructor() {
    let days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0,
      milliseconds = 0,
      ticks = 0;
    if (typeof arguments[0] === 'string') {
      const str = arguments[0];
      let match: RegExpMatchArray | null;
      if ((match = str.match(timeSpanWithDays))) {
        [days, hours, minutes, seconds, ticks] = match.splice(1, 6).map((x) => (x ? Number(x) : 0));
      } else if ((match = str.match(timeSpanNoDays))) {
        [hours, minutes, seconds, ticks] = match.splice(1, 4).map((x) => (x ? Number(x) : 0));
      }
    } else if (arguments.length === 1) [ticks] = arguments;
    else if (arguments.length === 3) [hours, minutes, seconds] = arguments;
    else if (arguments.length === 4) [days, hours, minutes, seconds] = arguments;
    else if (arguments.length === 5) [days, hours, minutes, seconds, milliseconds] = arguments;

    this.addDays(days);
    this.addHours(hours);
    this.addMinutes(minutes);
    this.addSeconds(seconds);
    this.addMilliseconds(milliseconds);
    this.addTicks(ticks);
  }

  #add = (value: number, multiplier?: number) =>
    (this.#ticks += multiplier ? value * multiplier : value);
  #subtract = (value: number, multiplier?: number) =>
    (this.#ticks -= multiplier ? value * multiplier : value);

  addTicks = (value: number) => this.#add(value);
  subtractTicks = (value: number) => this.#subtract(value);

  addMilliseconds = (value: number) => this.#add(value, ticksPerMillisecond);
  subtracktMilliseconds = (value: number) => this.#subtract(value, ticksPerMillisecond);

  addSeconds = (value: number) => this.#add(value, ticksPerSecond);
  subtractSeconds = (value: number) => this.#subtract(value, ticksPerSecond);

  addMinutes = (value: number) => this.#add(value, ticksPerMinute);
  subtractMinutes = (value: number) => this.#subtract(value, ticksPerMinute);

  addHours = (value: number) => this.#add(value, ticksPerHour);
  subtractHours = (value: number) => this.#subtract(value, ticksPerHour);

  addDays = (value: number) => this.#add(value, ticksPerDay);
  subtractDays = (value: number) => this.#subtract(value, ticksPerDay);

  get days() {
    return Math.floor(this.#ticks / ticksPerDay);
  }
  get hours() {
    return Math.floor(this.#ticks / ticksPerHour) % 24;
  }
  get minutes() {
    return Math.floor(this.#ticks / ticksPerMinute) % 60;
  }
  get seconds() {
    return Math.floor(this.#ticks / ticksPerSecond) % 60;
  }
  get milliseconds() {
    return Math.floor(this.#ticks / ticksPerMillisecond) % 1000;
  }
  get ticks() {
    const dayTicks = this.days * ticksPerDay;
    const hourTicks = this.hours * ticksPerHour;
    const minuteTicks = this.minutes * ticksPerMinute;
    const secondTicks = this.seconds * ticksPerSecond;
    return this.#ticks - dayTicks - hourTicks - minuteTicks - secondTicks;
  }

  get totalMilliseconds() {
    return Math.floor(this.#ticks / ticksPerMillisecond);
  }
  get totalSeconds() {
    return Math.floor(this.#ticks / ticksPerSecond);
  }
  get totalMinutes() {
    return Math.floor(this.#ticks / ticksPerMinute);
  }
  get totalHours() {
    return Math.floor(this.#ticks / ticksPerHour);
  }
  get totalDays() {
    return Math.floor(this.#ticks / ticksPerDay);
  }

  get totalTicks() {
    return this.#ticks;
  }

  toString = (include?: ('days' | 'hours' | 'minutes' | 'seconds' | 'ticks')[]) => {
    const toInclude = include ? [...new Set([...include])] : undefined;
    const parts1 = (toInclude ?? ['days', 'hours', 'minutes', 'seconds'])
      .filter((x) => x !== 'ticks')
      .map((part) => toDoubleDigitString(this[part]))
      .join(':');
    const parts2 = (toInclude ?? ['ticks'])
      .filter((x) => x === 'ticks')
      .map((part) => toDoubleDigitString(this[part]))[0];

    return parts2 ? `${parts1}.${parts2}` : parts1;

    // return (
    //   [this.days, this.hours, this.minutes, this.seconds].map(toDoubleDigitString).join(':') +
    //   '.' +
    //   toDoubleDigitString(this.ticks)
    // );
  };
}
