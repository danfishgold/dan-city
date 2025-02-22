import { range } from "./utils";

export function int(min: number, max: number) {
  return min + Math.floor((max + 1 - min) * Math.random());
}

export function float(min: number, max: number) {
  return min + (max - min) * Math.random();
}

export function wiggle(wig: number) {
  return float(-wig, wig);
}

export function choice<T>(options: T[], weightFn: (item: T) => number): T {
  if (options.length === 0) {
    throw new Error(`randomChoice with no options`);
  }
  const weights = options.map(weightFn);
  const total = weights.reduce((a, b) => a + b, 0);
  if (total === 0) {
    throw new Error(`weights total is zero`);
  }
  const randomNumber = Math.random() * total;
  let cumsum = 0;
  for (const index of range(0, options.length)) {
    cumsum += weights[index]!;
    if (cumsum >= randomNumber) {
      return options[index]!;
    }
  }
  throw new Error(`Impossible state`);
}

export function sample<T>(options: T[], count: number): T[] {
  if (count > options.length) {
    throw new Error(
      `Not enough options to sample ${count} items (list has ${options.length} items)`
    );
  }
  if (count === options.length) {
    return options;
  }

  const factors = new Array(options.length).fill(0).map(() => Math.random());
  const threshold = Array.from(factors).sort()[count - 1];
  return options.filter((_, index) => factors[index]! <= threshold!);
}
