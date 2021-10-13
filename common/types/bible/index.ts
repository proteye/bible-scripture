export interface IBibleInfo {
  name: string
  value: string
}

export interface IBibleBook {
  bookNumber: number
  shortName: string
  longName: string
  bookColor: string
  isPresent: boolean
}

export interface IBibleVerse {
  bookNumber: number
  chapter: number
  verse: number
  text: string
}
