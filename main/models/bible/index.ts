import { module } from '../index'
import { IBibleBook, IBibleInfo, IBibleVerse, TId, TModuleName } from 'common/types'
import { IBibleByName, IBibleByUid, IGetBibleVersesProps } from './types'

const bibleByUid: IBibleByUid = {}
const bibleByName: IBibleByName = {}

const openBible = (moduleName: TModuleName, uid: TId) => {
  bibleByUid[uid] = moduleName

  if (!bibleByName[moduleName]) {
    bibleByName[moduleName] = []
  }

  bibleByName[moduleName].push(uid)

  return module.openModule(moduleName, uid)
}

const closeBibleByUid = (uid: TId) => {
  const moduleName = bibleByUid[uid]

  if (!moduleName) {
    return false
  }

  const index = bibleByName[moduleName].indexOf(uid)

  if (index !== -1) {
    bibleByName[moduleName].splice(index, 1)
  }

  if (bibleByName[moduleName].length === 0) {
    delete bibleByName[moduleName]
  }

  delete bibleByUid[uid]

  module.closeModuleByUid(moduleName, uid)

  return module.closeModuleByUid(moduleName, uid)
}

const getBibleInfo = (uid: TId) => {
  return new Promise((resolve) => {
    const moduleName = bibleByUid[uid]
    const bible = module.openModule(moduleName, uid)

    bible.all('SELECT name, value FROM info', (_: any, info: IBibleInfo[]) => {
      resolve(info || [])
    })
  })
}

const getBibleBooks = (uid: TId) => {
  return new Promise((resolve) => {
    const moduleName = bibleByUid[uid]
    const bible = module.openModule(moduleName, uid)

    bible.all(
      'SELECT book_number AS bookNumber, short_name AS shortName, long_name AS longName, book_color AS bookColor, is_present AS isPresent FROM books_all',
      (_: any, books: IBibleBook[]) => {
        resolve(books || [])
      },
    )
  })
}

const getBibleVerses = (uid: TId, { bookNumber, chapter }: IGetBibleVersesProps) => {
  const moduleName = bibleByUid[uid]
  const bible = module.openModule(moduleName, uid)
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

export default { openBible, closeBibleByUid, getBibleInfo, getBibleBooks, getBibleVerses }
