import { range } from './utils'

export function int(min: number, max: number) {
  return min + Math.floor((max + 1 - min) * Math.random())
}

export function float(min: number, max: number) {
  return min + (max - min) * Math.random()
}

export function wiggle(wig: number) {
  return float(-wig, wig)
}

export function choice<T>(options: T[], weightFn: (item: T) => number): T {
  if (options.length === 0) {
    throw new Error(`randomChoice with no options`)
  }
  const weights = options.map(weightFn)
  const total = weights.reduce((a, b) => a + b, 0)
  if (total === 0) {
    throw new Error(`weights total is zero`)
  }
  const randomNumber = Math.random() * total
  let cumsum = 0
  for (const index of range(0, options.length)) {
    cumsum += weights[index]
    if (cumsum >= randomNumber) {
      return options[index]
    }
  }
}
