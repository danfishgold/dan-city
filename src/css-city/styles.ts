import { JssStyle } from 'jss'

// https://codepen.io/johan/pen/yGDoI
export function box(
  x: string,
  y: string,
  width: string,
  height: string,
  depth: string,
): JssStyle {
  return {
    '--box-left': `${x}`,
    '--box-top': `${y}`,
    '--box-width': `${width}`,
    '--box-height': `${height}`,
    '--box-depth': `${depth}`,
  }
}

export function flat(
  x: string,
  y: string,
  width: string,
  height: string,
): JssStyle {
  return {
    left: `${x}`,
    top: `${y}`,
    width: `${width}`,
    height: `${height}`,
  }
}
