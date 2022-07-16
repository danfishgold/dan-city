import { Block } from './block'
import LayoutEngine, { Rect } from './layout'
import * as random from './random'
import * as styles from './styles'

import jss, { JssStyle, StyleSheet } from 'jss'
import preset from 'jss-preset-default'

jss.setup({
  ...preset(),
  createGenerateId: () => (rule) => rule.key,
})

const sideCellCount =
  parseInt(new URLSearchParams(location.search).get('a') ?? '') || 12
const cellSide = 0.5
const gap = 0.7
const citySide = sideCellCount * cellSide + (sideCellCount - 1) * gap
const blockResolution = 20
const cityResolution = 18 / sideCellCount

const city = document.getElementById('city')!
let sheet: StyleSheet | null = null

type Density = 'superhigh' | 'high' | 'mid' | 'low'

function randomDensity(area: number): Density {
  const number = random.int(1, 10)
  if (number >= 8) {
    return area <= 10 ? 'superhigh' : 'high'
  } else if (number <= 3) {
    return 'low'
  } else {
    return 'mid'
  }
}

function randomBlockSize() {
  const side1 = random.int(2, 5)
  const side2 = side1 === 2 ? random.int(2, 3) : random.int(2, 5)
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
        depth: () => random.float(3, 8),
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

function fillCity(city: HTMLElement) {
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

  let boxStyles: JssStyle = {}
  let flatStyles: JssStyle = {}

  buildings.forEach((building, idx) => {
    if (building.isFlat) {
      // @ts-ignore
      flatStyles[`&:nth-child(${idx + 1})`] = styles.flat(
        `${building.x}em`,
        `${building.y}em`,
        `${building.width}em`,
        `${building.height}em`,
      )
    } else {
      // @ts-ignore
      boxStyles[`&:nth-child(${idx + 1})`] = styles.box(
        `${building.x}em`,
        `${building.y}em`,
        `${building.width}em`,
        `${building.height}em`,
        `${building.depth}em`,
      )
    }
  })

  if (sheet) {
    sheet.detach()
  }
  sheet = jss
    .createStyleSheet({
      box: boxStyles,
      flat: flatStyles,
    })
    .attach()

  city.style.width = `${citySide}em`
  city.style.height = `${citySide}em`
  buildings.forEach(({ isFlat }) => {
    if (isFlat) {
      const flat = document.createElement('div')
      flat.classList.add('flat')
      city.appendChild(flat)
    } else {
      const box = document.createElement('div')
      box.classList.add('box')
      city.appendChild(box)
    }
  })
}

fillCity(city)

city.onclick = () => {
  Array.from(city.children).forEach((c) => c.remove())
  fillCity(city)
}

let lastClampedScroll: number | null = null
const maxNegativeScroll = 40
const title = document.querySelector('h1')!

function transformBasedOnScroll() {
  const pos = window.scrollY
  const maxPositiveScroll = title.offsetTop
  const clamped = Math.min(maxPositiveScroll, Math.max(-maxNegativeScroll, pos))
  if (clamped == lastClampedScroll) {
    return
  } else {
    lastClampedScroll = clamped
  }
  if (clamped > 0) {
    city.style.transform = `rotateX(${
      (clamped / maxPositiveScroll) * 75
    }deg) rotateZ(45deg)`
    lastClampedScroll = clamped
  } else {
    city.style.transform = `scale(${
      1 + (clamped / maxNegativeScroll) * 0.15
    }) rotateZ(45deg)`
    lastClampedScroll = clamped
  }
}

transformBasedOnScroll()
window.addEventListener('scroll', transformBasedOnScroll)
