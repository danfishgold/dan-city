import { JssStyle } from 'jss'

// https://codepen.io/johan/pen/yGDoI
export function box(x, y, width, height, depth): JssStyle {
  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    transform: `translateZ(${depth}px)`,
    '&::before': {
      height: `${depth}px`,
      width: `${width}px`,
      transform: `translateZ(-${depth}px) rotateX(-90deg) translateZ(calc(${height}px - ${depth}px))`,
    },
    '&::after': {
      height: `${height}px`,
      width: `${depth}px`,
      transform: `translateZ(-${depth}px) rotateY(90deg) translateZ(calc(${width}px - ${depth}px))`,
    },
  }
}

export const allBoxes: JssStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  transformStyle: 'preserve-3d',
  '&::before': {
    content: '""',
    transformOrigin: 'bottom',
    transformStyle: 'preserve-3d',
    position: 'absolute',
    left: '0',
    top: '0',
    backgroundColor: 'pink',
  },
  '&::after': {
    content: '""',
    transformOrigin: 'right',
    transformStyle: 'preserve-3d',
    position: 'absolute',
    left: '0',
    top: '0',
    backgroundColor: 'black',
  },
}

export function flat(x, y, width, height): JssStyle {
  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  }
}

export const allFlats: JssStyle = {
  backgroundColor: 'paleturquoise',
  position: 'absolute',
}
