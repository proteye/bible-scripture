import { getNumberFromString } from "./getNumberFromString"

export const getStyleNumber = (value: string | number) => {
  console.log('value', value, typeof value)
  if (typeof value === 'number') {
    return `${value}px`
  }

  if (value.includes('%')) {
    return value
  }

  return `${getNumberFromString(value)}px`
}
