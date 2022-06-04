const regexp = /[^\d]/g

export const getNumberFromString = (str: string) => {
  return Number(str.replace(regexp, ''))
}
