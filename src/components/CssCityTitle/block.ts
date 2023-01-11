import { PointSet, range } from './utils'
import * as random from './random'

const allDirections = ['top', 'bottom', 'left', 'right'] as const
type Direction = (typeof allDirections)[number]

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
    const corners: [number, number][] = [
      [0, 0],
      [0, this.height - 1],
      [this.width - 1, 0],
      [this.width - 1, this.height - 1],
    ]

    if (pointCount <= 4) {
      return new PointSet(random.sample(corners, pointCount))
    }

    const circumfrence = (this.width + this.height) * 2
    const horizontalPointCount = Math.ceil(
      (this.width / circumfrence) * pointCount,
    )
    const verticalPointCount = Math.ceil(
      (this.height / circumfrence) * pointCount,
    )
    const wiggle =
      Math.min(
        this.width / horizontalPointCount,
        this.height / verticalPointCount,
      ) * 0.4

    const middleHorizontals: [number, number][] = range(
      2,
      horizontalPointCount + 1,
    ).flatMap((index) => {
      const left1 = Math.round(
        (index / (horizontalPointCount + 2)) * this.width +
          random.wiggle(wiggle),
      )
      const left2 = Math.round(
        (index / (horizontalPointCount + 2)) * this.width +
          random.wiggle(wiggle),
      )

      return [
        [left1, 0],
        [left2, this.height - 1],
      ]
    })

    const middleVerticals: [number, number][] = range(
      2,
      verticalPointCount + 1,
    ).flatMap((index) => {
      const top1 = Math.round(
        (index / (verticalPointCount + 2)) * this.height +
          random.wiggle(wiggle),
      )
      const top2 = Math.round(
        (index / (verticalPointCount + 2)) * this.height +
          random.wiggle(wiggle),
      )

      return [
        [0, top1],
        [this.width - 1, top2],
      ]
    })

    return new PointSet([
      ...corners,
      ...random.sample(
        [...middleHorizontals, ...middleVerticals],
        pointCount - 4,
      ),
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
    ) as Record<Direction, [number, number][]>

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
