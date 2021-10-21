import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { nanoid } from 'nanoid'
import { IBibleVerse, IBibleInfo, IBibleBook } from '@common/types'
import { IBibleViewProps } from './types'

const verseRegexp = /(.+?)\s*([0-9]+)[:\s]?([0-9]+)?/i

const useBase = ({ moduleName }: IBibleViewProps) => {
  const [info, setInfo] = useState<IBibleInfo[]>([])
  const [books, setBooks] = useState<IBibleBook[]>([])
  const [verses, setVerses] = useState<IBibleVerse[]>([])

  const uid = useMemo(() => nanoid(), [])

  const handleSearchSubmit = useCallback(
    async (value: string) => {
      const matches = value.toLowerCase().match(verseRegexp)
      if (matches.length < 3) {
        return
      }

      const [, bookName, chapter, verse] = matches

      const book = books.find(({ shortName, longName }) => {
        return shortName.toLowerCase().includes(bookName) || longName.toLowerCase().includes(bookName)
      })

      if (book) {
        const verses = await ipcRenderer.invoke('getBibleVerses', uid, {
          bookNumber: book.bookNumber,
          chapter,
        })
        setVerses(verses)
      }
    },
    [books],
  )

  const getBible = useCallback(async () => {
    if (!moduleName) {
      return
    }

    await ipcRenderer.invoke('openBible', moduleName, uid)
    const info = await ipcRenderer.invoke('getBibleInfo', uid)
    const books = await ipcRenderer.invoke('getBibleBooks', uid)
    const verses = await ipcRenderer.invoke('getBibleVerses', uid, {
      bookNumber: books[0].bookNumber,
      chapter: 1,
    })
    setInfo(info)
    setBooks(books)
    setVerses(verses)
  }, [])

  useEffect(() => {
    getBible()
  }, [getBible])

  return {
    info,
    verses,
    handleSearchSubmit,
  }
}

export default useBase
