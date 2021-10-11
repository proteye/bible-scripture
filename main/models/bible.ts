import { openDb } from '../db'
import { IBibleBook, IBibleInfo, IBibleVerse } from '@/types'

const bibles = {}

const openBible = (name: string) => {
  return new Promise((resolve) => {
    bibles[name] = openDb(name)
    resolve(true)
  })
}

const closeBible = (name: string) => {
  return new Promise((resolve) => {
    if (bibles[name]) {
      resolve(true)
      return
    }
    resolve(false)
  })
}

const getBibleInfo = (name: string) => {
  return new Promise((resolve) => {
    bibles[name].all('SELECT name, value FROM info', (_: any, info: IBibleInfo[]) => {
      resolve(info || [])
    })
  })
}

const getBibleBooks = (name: string) => {
  return new Promise((resolve) => {
    bibles[name].all(
      'SELECT book_number AS bookNumber, short_name AS shortName, long_name AS longName, book_color AS bookColor, is_present AS isPresent FROM books_all',
      (_: any, books: IBibleBook[]) => {
        resolve(books || [])
      },
    )
  })
}

const getBibleVerses = (name: string, { bookNumber }) => {
  const condition = `book_number = ${bookNumber} AND chapter = 1`

  return new Promise((resolve) => {
    bibles[name].all(
      `SELECT book_number AS bookNumber, chapter, verse, text FROM verses WHERE ${condition}`,
      (_: any, verses: IBibleVerse[]) => {
        resolve(verses || [])
      },
    )
  })
}

export default { openBible, closeBible, getBibleInfo, getBibleBooks, getBibleVerses }
