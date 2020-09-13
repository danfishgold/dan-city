import { JssStyle } from 'jss'

// https://codepen.io/johan/pen/yGDoI
export function box(x, y, width, height, depth): JssStyle {
  return {
    '--box-left': `${x}`,
    '--box-top': `${y}`,
    '--box-width': `${width}`,
    '--box-height': `${height}`,
    '--box-depth': `${depth}`,
  }
}

export function flat(x, y, width, height): JssStyle {
  return {
    left: `${x}`,
    top: `${y}`,
    width: `${width}`,
    height: `${height}`,
  }
}
