import { Block } from './block'
import LayoutEngine, { Rect } from './layout'
import * as random from './random'

const sideCellCount =
  parseInt(new URLSearchParams(location.search).get('a') ?? '') || 13
const cellSide = 0.5
const gap = 0.4
const citySide = sideCellCount * cellSide + (sideCellCount - 1) * gap
const blockResolution = 20
const cityResolution = 23 / sideCellCount

type Density = 'superhigh' | 'high' | 'mid' | 'low'

function randomDensity(area: number): Density {
  const number = random.int(1, 10)
  if (number >= 9) {
    return area <= 10 ? 'superhigh' : 'high'
  } else if (number <= 3) {
    return 'low'
  } else {
    return 'mid'
  }
}

function randomBlockSize() {
  const side1 = random.int(2, 3)
  const side2 = side1 === 2 ? random.int(2, 4) : random.int(2, 5)
  return random.int(0, 2) === 0
    ? { width: side1, height: side2 }
    : { height: side1, width: side2 }
}

function blockProperties(
  density: Density,
  blockArea: number,
): { buildingCount: number; depth: () => number; retreatFactor: () => number } {
  switch (density) {
    case 'superhigh':
      return {
        buildingCount: 1,
        depth: () => random.float(9, 18),
        retreatFactor: () => random.float(0.05, 0.1),
      }
    case 'high':
      return {
        buildingCount: random.int(2, 5),
        depth: () => random.float(5, 10),
        retreatFactor: () => random.float(0.1, 0.2),
      }
    case 'mid':
      return {
        buildingCount: Math.round(blockArea * 0.7 + random.wiggle(2)),
        depth: () => random.float(1.5, 2),
        retreatFactor: () => random.float(0.025, 0.1),
      }
    case 'low':
      return {
        buildingCount: Math.round(blockArea * 0.7 + random.wiggle(2)),
        depth: () => random.float(0.75, 1.5),
        retreatFactor: () => random.float(0.025, 0.1),
      }
  }
}

export function fillCity(city: HTMLElement) {
  const engine = new LayoutEngine(document.body, sideCellCount)
  let rects: Rect[] = []
  let nextRect = engine.addRect(randomBlockSize())
  while (nextRect) {
    rects.push(nextRect)
    nextRect = engine.addRect(randomBlockSize())
  }
  engine.remove()

  const blocks = rects.map((rect) => ({
    x: (cellSide + gap) * rect.x,
    y: (cellSide + gap) * rect.y,
    width: cellSide * rect.width + gap * (rect.width - 1),
    height: cellSide * rect.height + gap * (rect.height - 1),
  }))
  const buildings = blocks.flatMap((blockRect) => {
    const blockArea = blockRect.width * blockRect.height

    const block = new Block(
      Math.round(blockRect.width * blockResolution),
      Math.round(blockRect.height * blockResolution),
    )

    const density = randomDensity(blockArea)
    const { buildingCount, depth, retreatFactor } = blockProperties(
      density,
      blockArea,
    )
    return block
      .makeBuildings(buildingCount)
      .map((building) => block.retreat(building, retreatFactor()))
      .map((building) => ({
        x: (blockRect.x + building.left / blockResolution) * cityResolution,
        y: (blockRect.y + building.top / blockResolution) * cityResolution,
        width: (building.width / blockResolution) * cityResolution,
        height: (building.height / blockResolution) * cityResolution,
        depth: depth(),
        isFlat: random.int(1, 10) <= 1,
      }))
  })

  city.style.width = `${citySide}em`
  city.style.height = `${citySide}em`
  buildings.forEach((building) => {
    if (building.isFlat) {
      const flat = document.createElement('div')
      flat.classList.add('flat')
      flat.style.setProperty('--flat-left', `${building.x}em`)
      flat.style.setProperty('--flat-top', `${building.y}em`)
      flat.style.setProperty('--flat-width', `${building.width}em`)
      flat.style.setProperty('--flat-height', `${building.height}em`)
      city.appendChild(flat)
    } else {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.setProperty('--box-left', `${building.x}em`)
      box.style.setProperty('--box-top', `${building.y}em`)
      box.style.setProperty('--box-width', `${building.width}em`)
      box.style.setProperty('--box-height', `${building.height}em`)
      box.style.setProperty('--box-depth', `${building.depth}em`)
      city.appendChild(box)
    }
  })
}
