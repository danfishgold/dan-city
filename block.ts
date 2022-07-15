import * as random from './random'
import { PointSet, range } from './utils'

const allDirections = ['top', 'bottom', 'left', 'right'] as const
type Direction = typeof allDirections[number]

class Building {
  left: number
  top: number
  width: number
  height: number

  constructor(x: number, y: number) {
    this.left = x
    this.top = y
    this.width = 1
    this.height = 1
  }

  get right() {
    return this.left + this.width
  }

  get bottom() {
    return this.top + this.height
  }

  xs() {
    return range(this.left, this.right)
  }

  ys() {
    return range(this.top, this.bottom)
  }

  get borderWidth() {
    return Math.min(this.width, this.height) * 0.1
  }

  pointsTowardsDirection(direction: Direction) {
    switch (direction) {
      case 'right':
        return this.ys().map((y) => [this.right + 1, y])
      case 'left':
        return this.ys().map((y) => [this.left - 1, y])
      case 'top':
        return this.xs().map((x) => [x, this.top - 1])
      case 'bottom':
        return this.xs().map((x) => [x, this.bottom + 1])
      default:
        throw new Error(`Unknown direction: ${direction}`)
    }
  }

  expand(direction: Direction) {
    switch (direction) {
      case 'right': {
        this.width += 1
        break
      }
      case 'left': {
        this.left -= 1
        this.width += 1
        break
      }
      case 'top': {
        this.top -= 1
        this.height += 1
        break
      }
      case 'bottom': {
        this.height += 1
        break
      }
      default: {
        throw new Error(`Unknown direction: ${direction}`)
      }
    }
  }

  expansionWeight(direction: Direction) {
    switch (direction) {
      case 'right':
        return this.expansionWeightHelper(this.width, this.height)
      case 'left':
        return this.expansionWeightHelper(this.width, this.height)
      case 'top':
        return this.expansionWeightHelper(this.height, this.width)
      case 'bottom':
        return this.expansionWeightHelper(this.height, this.width)
      default:
        throw new Error(`Unknown direction: ${direction}`)
    }
  }

  expansionWeightHelper(along: number, perpendicular: number) {
    if (along / perpendicular > 2) {
      return 0
    }
    return Math.pow(perpendicular, 6)
  }
}

export class Block {
  width: number
  height: number
  takenPoints: PointSet

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.takenPoints = new PointSet()
  }

  randomPoints(pointCount: number) {
    const circumfrence = (this.width + this.height) * 2
    const widthPointCount = Math.round(
      (this.width / circumfrence) * (pointCount + 2),
    )
    const heightPointCount = Math.round(
      (this.height / circumfrence) * (pointCount + 2),
    )
    console.log([widthPointCount, heightPointCount])
    const wiggle =
      Math.min(this.width / widthPointCount, this.height / heightPointCount) *
      0.4

    const lefts = range(0, widthPointCount).flatMap((index) => {
      if (index === 0) {
        return [0]
      }
      if (index === 1 || index === widthPointCount - 1) {
        return []
      }
      return [
        Math.round(
          (index / widthPointCount) * this.width + random.wiggle(wiggle),
        ),
      ]
    })

    const tops = range(0, heightPointCount).flatMap((index) => {
      if (index === 1 || index === heightPointCount - 1) {
        return []
      }
      return [Math.round((index / heightPointCount) * this.height)]
    })

    return new PointSet([
      ...lefts.flatMap((left) => [
        [this.width - 1 - left, 0],
        [left, this.height - 1],
      ]),
      ...tops.flatMap((top) => [
        [0, top],
        [this.width - 1, this.height - 1 - top],
      ]),
    ])
  }

  makeBuildings(buildingCount: number) {
    this.takenPoints = new PointSet()
    const points = this.randomPoints(buildingCount)
    points.forEach((pt) => this.takenPoints.add(pt))

    const buildings = points.map(([x, y]) => new Building(x, y))
    let changableBuildings = buildings.slice()
    while (changableBuildings.length > 0) {
      const newChangableBuildings = []
      for (const building of changableBuildings) {
        const canStillChange = this.tryToExpand(building)
        if (canStillChange) {
          newChangableBuildings.push(building)
        }
      }
      changableBuildings = newChangableBuildings
    }
    return buildings //.filter((rect) => rect.width > 2 && rect.height > 2)
  }

  retreat(building: Building, factor: number) {
    const amount = Math.round(
      Math.min(building.width, building.height) * factor,
    )
    if (building.top !== 0) {
      building.top += amount
      building.height -= amount
    }
    if (building.left !== 0) {
      building.left += amount
      building.width -= amount
    }
    if (building.bottom !== this.height - 1) {
      building.height -= amount
    }
    if (building.right !== this.width - 1) {
      building.width -= amount
    }
    return building
  }

  tryToExpand(building: Building) {
    const expansions = Object.fromEntries(
      allDirections.map((direction) => [
        direction,
        building.pointsTowardsDirection(direction),
      ]),
    )

    const validDirections = allDirections.filter((direction) =>
      expansions[direction].every((pt) => this.isFree(pt)),
    )

    try {
      const direction = random.choice(validDirections, (direction) =>
        building.expansionWeight(direction),
      )
      building.expand(direction)
      expansions[direction].forEach((pt) => this.takenPoints.add(pt))
      return true
    } catch {
      return false
    }
  }

  isFree([x, y]: [number, number]) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false
    }
    return !this.takenPoints.has([x, y])
  }
}

const c = new Block(260, 400)
const rects = c.makeBuildings(20)