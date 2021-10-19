export interface IBibleInfo {
  name: string
  value: string
}

export interface IBibleBook {
  bookNumber: number
  bookColor: string
  title: string
  shortName: string
  longName: string
  isPresent: boolean
  sortingOrder?: number
}

export interface IBibleVerse {
  bookNumber: number
  chapter: number
  verse: number
  text: string
}

export interface IBibleIntroductions {
  bookNumber: number
  introduction: string
}

export interface IBibleStories {
  bookNumber: number
  chapter: number
  verse: number
  orderIfSeveral: number
  title: string
}
