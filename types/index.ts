export type BibleInfo = { name: string; value: string }

export type BibleBook = {
  bookNumber: number
  shortName: string
  longName: string
  bookColor: string
  isPresent: boolean
}

export type BibleVerse = {
  bookNumber: number
  chapter: number
  verse: number
  text: string
}

export type BibleItem = {
  id: string
  info: BibleInfo[]
  books: BibleBook[]
  verses: BibleVerse[]
}

export interface BibleState {
  items: BibleItem[]
}
