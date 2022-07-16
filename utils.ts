export function range(a: number, b: number): number[] {
  if (a > b) {
    return range(b, a)
  }
  return new Array(b - a).fill(0).map((_, i) => a + i)
}

export class PointSet {
  _set: Set<string>
  constructor(pts: [number, number][] = []) {
    this._set = new Set(pts.map((pt) => JSON.stringify(pt)))
  }

  add(pt: [number, number]) {
    return this._set.add(JSON.stringify(pt))
  }

  has(pt: [number, number]): boolean {
    return this._set.has(JSON.stringify(pt))
  }

  forEach(fn: (pt: [number, number]) => void) {
    return this._set.forEach((pt) => fn(JSON.parse(pt)))
  }

  map<T>(fn: (pt: [number, number]) => T): T[] {
    return Array.from(this._set).map((pt) => fn(JSON.parse(pt)))
  }
}
