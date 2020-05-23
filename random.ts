export function int(min: number, max: number) {
  return min + Math.floor((max + 1 - min) * Math.random())
}

export function float(min: number, max: number) {
  return min + (max - min) * Math.random()
}
