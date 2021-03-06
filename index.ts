import LayoutEngine, { Rect } from './layout'
import * as styles from './styles'
import * as random from './random'

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

function fillCity(city: HTMLElement) {
  const engine = new LayoutEngine(document.body, sideCellCount)
  let rects: Rect[] = []
  let nextRect = engine.addRect(random.int(2, 5), random.int(2, 5))
  while (nextRect) {
    rects.push(nextRect)
    nextRect = engine.addRect(random.int(2, 5), random.int(2, 5))
  }
  engine.remove()

  let blocks = rects.map((rect) => {
    return {
      ...rect,
      isFlat: random.int(1, 10) <= 4,
    }
  })

  let boxStyles: JssStyle = {}
  let flatStyles: JssStyle = {}

  blocks.forEach((block, idx) => {
    const wd = cellSide * block.width + gap * (block.width - 1)
    const ht = cellSide * block.height + gap * (block.height - 1)
    const x0 = (cellSide + gap) * block.x
    const y0 = (cellSide + gap) * block.y
    if (block.isFlat) {
      flatStyles[`&:nth-child(${idx + 1})`] = styles.flat(
        `${x0}em`,
        `${y0}em`,
        `${wd}em`,
        `${ht}em`,
      )
    } else {
      const dp = random.float(2, 20)
      boxStyles[`&:nth-child(${idx + 1})`] = styles.box(
        `${x0}em`,
        `${y0}em`,
        `${wd}em`,
        `${ht}em`,
        `${dp}em`,
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
  blocks.forEach(({ isFlat }) => {
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
