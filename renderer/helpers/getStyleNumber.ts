import { getNumberFromString } from "./getNumberFromString"

export const getStyleNumber = (value: string | number) => {
  if (typeof value === 'number') {
    return `${value}px`
  }

  if (value.includes('%')) {
    return value
  }

  return `${getNumberFromString(value)}px`
}
