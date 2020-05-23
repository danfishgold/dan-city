import { JssStyle } from 'jss'

// https://codepen.io/johan/pen/yGDoI
export function box(x, y, width, height, depth): JssStyle {
  return {
    left: `${x}`,
    top: `${y}`,
    width: `${width}`,
    height: `${height}`,
    transform: `translateZ(${depth})`,
    '&::before': {
      height: `${depth}`,
      width: `${width}`,
      transform: `translateZ(-${depth}) rotateX(-90deg) translateZ(calc(${height} - ${depth}))`,
    },
    '&::after': {
      height: `${height}`,
      width: `${depth}`,
      transform: `translateZ(-${depth}) rotateY(90deg) translateZ(calc(${width} - ${depth}))`,
    },
  }
}

export const allBoxes: JssStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  transformStyle: 'preserve-3d',
  border: '2px solid white',
  '&::before': {
    content: '""',
    transformOrigin: 'bottom',
    transformStyle: 'preserve-3d',
    position: 'absolute',
    left: '0',
    top: '0',
    backgroundColor: 'pink',
    border: '2px solid pink',
  },
  '&::after': {
    content: '""',
    transformOrigin: 'right',
    transformStyle: 'preserve-3d',
    position: 'absolute',
    left: '0',
    top: '0',
    backgroundColor: 'black',
    border: '2px solid black',
  },
}

export function flat(x, y, width, height): JssStyle {
  return {
    left: `${x}`,
    top: `${y}`,
    width: `${width}`,
    height: `${height}`,
  }
}

export const allFlats: JssStyle = {
  backgroundColor: 'paleturquoise',
  position: 'absolute',
  border: '2px solid paleturquoise',
}
