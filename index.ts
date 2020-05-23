import LayoutEngine, { Rect } from './layout'
import * as styles from './styles'
import jss, { JssStyle } from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

function random(min: number, max: number) {
  return min + Math.floor((max + 1 - min) * Math.random())
}

function randomFloat(min: number, max: number) {
  return min + (max - min) * Math.random()
}

const sideCellCount = 18

const engine = new LayoutEngine(document.body, sideCellCount)

let rects: Rect[] = []
let nextRect = engine.addRect(random(2, 5), random(2, 5))
while (nextRect) {
  rects.push(nextRect)
  nextRect = engine.addRect(random(2, 5), random(2, 5))
}
engine.remove()

let blocks = rects.map((rect) => {
  return {
    ...rect,
    isFlat: random(1, 10) <= 4,
  }
})

const cellSide = 0.5
const gap = 0.7
const citySide = sideCellCount * cellSide + (sideCellCount - 1) * gap

let boxStyles: JssStyle = { ...styles.allBoxes }
let flatStyles: JssStyle = { ...styles.allFlats }

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
      `${ht}em`
    )
  } else {
    const dp = randomFloat(0, 20)
    boxStyles[`&:nth-child(${idx + 1})`] = styles.box(
      `${x0}em`,
      `${y0}em`,
      `${wd}em`,
      `${ht}em`,
      `${dp}em`
    )
  }
})

const sheet = jss
  .createStyleSheet({
    box: boxStyles,
    flat: flatStyles,
  })
  .attach()
const boxClass = sheet.classes.box
const flatClass = sheet.classes.flat

const city = document.getElementById('city')
city.style.width = `${citySide}px`
city.style.height = `${citySide}px`
blocks.forEach(({ isFlat }) => {
  if (isFlat) {
    const flat = document.createElement('div')
    flat.classList.add(flatClass)
    city.appendChild(flat)
  } else {
    const box = document.createElement('div')
    box.classList.add(boxClass)
    city.appendChild(box)
  }
})