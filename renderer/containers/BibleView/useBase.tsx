import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { nanoid } from 'nanoid'
import { IBibleVerse, IBibleInfo, IBibleBook } from '@common/types'
import { IBiblePreapredVerse, IBibleViewProps } from './types'

const NT_BEGIN_BOOK_NUMBER = 470

const verseRegexp = /(.+?)\s*([0-9]+)[:\s]?([0-9]+)?/i

const strongRegexp = /<S>([0-9]+)<\/S>/i

const prepareVerseText = (text: string, bookNumber: number, onMouseEnter: (e) => void) => {
  const splittedText = text.split(' ')

  return splittedText.map((word, index) => {
    const strongMatches = word.match(strongRegexp)
    const strongNumber = strongMatches?.length > 1 ? strongMatches[1] : null
    const strongPrefix = bookNumber < NT_BEGIN_BOOK_NUMBER ? 'H' : 'G'
    const preapredWord = word
      .replace(/<[Sfim]>.+?[Sfim]>/gi, '')
      .replace(/<pb\/>/gi, '')
      .replace(/<\/?t>/gi, '"')

    return (
      <span
        key={`${index}-${preapredWord}`}
        data-strong={strongNumber ? `${strongPrefix}${strongNumber}` : null}
        onMouseEnter={onMouseEnter}
      >
        {preapredWord}{' '}
      </span>
    )
  })
}

const prepareVerses = (verses: IBibleVerse[], onMouseEnter: (e) => void): IBiblePreapredVerse[] =>
  verses?.map((verse: IBibleVerse) => ({
    ...verse,
    preparedText: prepareVerseText(verse.text, verse.bookNumber, onMouseEnter),
  }))

const useBase = ({ moduleName, onGetDictionaryTopic }: IBibleViewProps) => {
  const [info, setInfo] = useState<IBibleInfo[]>([])
  const [books, setBooks] = useState<IBibleBook[]>([])
  const [verses, setVerses] = useState<IBiblePreapredVerse[]>([])

  const uid = useMemo(() => nanoid(), [])

  const handleVerseMouseEnter = useCallback(
    (e) => {
      const strong = e.currentTarget.dataset['strong']
      if (strong) {
        onGetDictionaryTopic?.(strong)
      }
    },
    [onGetDictionaryTopic],
  )

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
        setVerses(prepareVerses(verses, handleVerseMouseEnter))
      }
    },
    [books, handleVerseMouseEnter],
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
    setVerses(prepareVerses(verses, handleVerseMouseEnter))
  }, [handleVerseMouseEnter])

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
