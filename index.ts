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

const sideCellCount = 18
const cellSide = 0.5
const gap = 0.7
const citySide = sideCellCount * cellSide + (sideCellCount - 1) * gap

const city = document.getElementById('city')
let sheet: StyleSheet | null = null

function randomDensity(): 'high' | 'mid' | 'low' {
  const number = random.int(1, 10)
  if (number >= 8) {
    return 'high'
  } else if (number <= 3) {
    return 'low'
  } else {
    return 'mid'
  }
}

function randomBuildingDepth(density: 'high' | 'mid' | 'low'): number {
  switch (density) {
    case 'high':
      return random.float(4, 8)
    case 'mid':
      return random.float(1.5, 3)
    case 'low':
      return random.float(0.75, 1.5)
  }
}

function randomBlockSize() {
  const side1 = random.int(2, 5)
  const side2 = side1 === 2 ? random.int(2, 3) : random.int(2, 5)
  return random.int(0, 2) === 0
    ? { width: side1, height: side2 }
    : { height: side1, width: side2 }
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
    const density = randomDensity()

    // small tower block => make the entire block a tower
    if (density === 'high' && blockArea < 10) {
      return [{ ...blockRect, depth: random.float(10, 18), isFlat: false }]
    }

    const scale = 50
    const block = new Block(
      Math.round(blockRect.width * scale),
      Math.round(blockRect.height * scale),
    )

    return block
      .makeBuildings(
        density === 'high' ? random.int(1, 6) : Math.round(blockArea * 0.7),
      )
      .map((building) => block.retreat(building, random.float(0.05, 0.1)))
      .map((building) => ({
        x: blockRect.x + building.left / scale,
        y: blockRect.y + building.top / scale,
        width: building.width / scale,
        height: building.height / scale,
        depth: randomBuildingDepth(density),
        isFlat: random.int(1, 10) <= 1,
      }))
  })

  let boxStyles: JssStyle = {}
  let flatStyles: JssStyle = {}

  buildings.forEach((building, idx) => {
    if (building.isFlat) {
      flatStyles[`&:nth-child(${idx + 1})`] = styles.flat(
        `${building.x}em`,
        `${building.y}em`,
        `${building.width}em`,
        `${building.height}em`,
      )
    } else {
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

let lastClampedScroll = null
const maxNegativeScroll = 40
const title = document.querySelector('h1')

function transformBasedOnScroll() {
  // city?.style.transform = `rotateX(45deg) rotateZ(45deg)`
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
