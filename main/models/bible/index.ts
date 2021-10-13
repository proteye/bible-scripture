import { common } from '../index'
import { IBibleBook, IBibleInfo, IBibleVerse, TModuleName } from 'common/types'
import { IGetBibleVersesProps } from './types'

const getBibleInfo = (moduleName: TModuleName) => {
  return new Promise((resolve) => {
    const bible = common.openModule(moduleName)

    bible.all('SELECT name, value FROM info', (_: any, info: IBibleInfo[]) => {
      resolve(info || [])
    })
  })
}

const getBibleBooks = (moduleName: TModuleName) => {
  return new Promise((resolve) => {
    const bible = common.openModule(moduleName)

    bible.all(
      'SELECT book_number AS bookNumber, short_name AS shortName, long_name AS longName, book_color AS bookColor, is_present AS isPresent FROM books_all',
      (_: any, books: IBibleBook[]) => {
        resolve(books || [])
      },
    )
  })
}

const getBibleVerses = (moduleName: TModuleName, { bookNumber, chapter }: IGetBibleVersesProps) => {
  const bible = common.openModule(moduleName)
  const condition = `book_number = ${bookNumber} AND chapter = ${chapter}`

  return new Promise((resolve) => {
    bible.all(
      `SELECT book_number AS bookNumber, chapter, verse, text FROM verses WHERE ${condition}`,
      (_: any, verses: IBibleVerse[]) => {
        resolve(verses || [])
      },
    )
  })
}

export default { getBibleInfo, getBibleBooks, getBibleVerses }
