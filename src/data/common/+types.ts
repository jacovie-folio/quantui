import { ClassProps } from '../../generics';

export class Dimensions {
  readonly width!: number;
  readonly height!: number;

  constructor(props: ClassProps<Dimensions>) {
    Object.assign(this, props);
  }

  static fromBounds(min: [number, number], max: [number, number]) {
    return new Dimensions({
      width: max[0] - min[0],
      height: max[1] - min[1],
    });
  }

  public scale(factor: number) {
    return new Dimensions({
      width: this.width * factor,
      height: this.height * factor,
    });
  }

  public toObject() {
    return {
      width: this.width,
      height: this.height,
    };
  }
}

export class Duration {
  readonly numSeconds!: number;

  constructor(props: ClassProps<Duration>) {
    Object.assign(this, props);
  }

  static fromSeconds(seconds: number): Duration {
    return new Duration({ numSeconds: seconds });
  }

  static fromMinutes(minutes: number): Duration {
    return new Duration({ numSeconds: 60 * minutes });
  }

  public toSeconds(): number {
    return this.numSeconds;
  }

  public toMinutes(): number {
    return this.numSeconds / 60;
  }
}

export class Rate {
  readonly amountPerSecond!: number;

  constructor(props: ClassProps<Rate>) {
    Object.assign(this, props);
  }

  static fromDuration(amount: number, duration: Duration): Rate {
    return new Rate({ amountPerSecond: amount / duration.toSeconds() });
  }

  public totalInDuration(duration: Duration): number {
    return this.amountPerSecond * duration.toSeconds();
  }
}

export class Range {
  readonly min!: number;
  readonly max!: number;

  constructor(props: ClassProps<Range>) {
    Object.assign(this, props);
  }

  static fromTuple(min: number, max: number): Range {
    return new Range({ min, max });
  }

  public getAverage(): number {
    return (this.min + this.max) / 2;
  }
}

function segment(
  index: number,
  divisor: number,
  total: number = 360
): [number, number] {
  return [index * (total / divisor), (index + 1) * (total / divisor)];
}

function isBetween(input: number, ...rangeTuples: Array<[number, number]>) {
  return rangeTuples.some((range) => input >= range[0] && input < range[1]);
}

export class Color {
  readonly red!: number;
  readonly green!: number;
  readonly blue!: number;

  constructor(props: ClassProps<Color>) {
    Object.assign(this, props);
  }

  static fromRGB(r: number, g: number, b: number): Color {
    return new Color({ red: r, green: g, blue: b });
  }

  static fromHSV(hue: number, saturation: number, value: number): Color {
    const primary = value * saturation;
    const secondary = primary * (1 - Math.abs(((hue / 60) % 2) - 1));
    const median = value - primary;

    const sixth = (index: number) => segment(index, 6);

    const component = (
      primarySegments: [number, number],
      secondarySegments: [number, number]
    ) => {
      if (isBetween(hue, ...primarySegments.map((index) => sixth(index))))
        return primary;
      if (isBetween(hue, ...secondarySegments.map((index) => sixth(index))))
        return secondary;
      return 0;
    };

    const r = component([0, 5], [1, 4]);
    const g = component([1, 2], [0, 3]);

    const b = component([3, 4], [2, 5]);

    return new Color({
      red: Math.round((r + median) * 255),
      green: Math.round((g + median) * 255),
      blue: Math.round((b + median) * 255),
    });
  }
}
