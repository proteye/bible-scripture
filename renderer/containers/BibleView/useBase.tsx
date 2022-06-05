import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { nanoid } from 'nanoid'
import { IBibleVerse, IBibleInfo, IBibleBook } from '@common/types'
import { IBiblePreapredVerse, IBibleViewProps } from './types'
import { getBookNumberByName } from 'helpers/getBookNumber'

const NT_BEGIN_BOOK_NUMBER = 470

const verseRegexp = /(.+?)\s*([0-9]+)[:\s]?([0-9]+)?/i

const strongRegexp = /<S>([0-9]+)<\/S>/i

const morphologyRegexp = /<m>([0-9A-z-\/]+)<\/m>/i

const getStrongNumbersPrefix = (info: IBibleInfo[]) => {
  const strongNumbersPrefix = info.find(({ name }) => name === 'strong_numbers_prefix')

  return strongNumbersPrefix?.value
}

const prepareVerseText = ({
  text,
  bookNumber,
  strongNumbersPrefix,
  onMouseEnter,
}: {
  text: string
  bookNumber: number
  strongNumbersPrefix?: string
  onMouseEnter?: (e) => void
}) => {
  const spaceClearedText = text.replace(/(<[Sfim]>)\s*(.+?)\s*([Sfim]>)/gi, '$1$2$3')
  const splittedText = spaceClearedText.split(' ')

  return splittedText.map((word, index) => {
    // Strong
    const strongMatches = word.match(strongRegexp)
    const strongNumber = strongMatches?.length > 1 ? strongMatches[1] : null
    const strongPrefix = strongNumbersPrefix || (bookNumber < NT_BEGIN_BOOK_NUMBER ? 'H' : 'G')
    // Morphology
    const morphologyMatches = word.match(morphologyRegexp)
    const morphologyIndication = morphologyMatches?.length > 1 ? morphologyMatches[1] : null

    const preparedWord = word
      .replace(/<[Sfim]>.+?[Sfim]>/gi, '')
      .replace(/<pb\/>/gi, '')
      .replace(/<\/?t>/gi, '"')

    return (
      <span
        key={`${index}-${preparedWord}`}
        className="hover:bg-blue-200 selection:hover:bg-blue-200"
        data-strong={strongNumber ? `${strongPrefix}${strongNumber}` : null}
        data-morphology={morphologyIndication}
        onMouseEnter={onMouseEnter}
      >
        {preparedWord}{' '}
      </span>
    )
  })
}

const prepareVerses = (
  verses: IBibleVerse[],
  strongNumbersPrefix: string,
  onMouseEnter: (e) => void,
): IBiblePreapredVerse[] =>
  verses?.map((verse: IBibleVerse) => ({
    ...verse,
    preparedText: prepareVerseText({
      text: verse.text,
      bookNumber: verse.bookNumber,
      strongNumbersPrefix,
      onMouseEnter,
    }),
  }))

const useBase = ({ moduleName, onGetDictionaryTopic }: IBibleViewProps) => {
  const [info, setInfo] = useState<IBibleInfo[]>([])
  const [books, setBooks] = useState<IBibleBook[]>([])
  const [verses, setVerses] = useState<IBiblePreapredVerse[]>([])

  const uid = useMemo(() => nanoid(), [])

  const language = useMemo(() => {
    const lang = info.find(({ name }) => name === 'language')

    return lang?.value
  }, [info])

  const verseClass = useMemo(() => {
    switch (language) {
      case 'grc':
        return 'text-xl'
      case 'iw':
        return 'text-2xl'
      default:
        return 'text-base'
    }
  }, [language])

  const handleVerseMouseEnter = useCallback(
    (e) => {
      const strong = e.currentTarget.dataset['strong']
      const morphology = e.currentTarget.dataset['morphology']

      if (strong) {
        onGetDictionaryTopic?.(strong, morphology)
      }
    },
    [onGetDictionaryTopic],
  )

  const handleSearchSubmit = useCallback(
    async (value: string) => {
      const matches = value.toLowerCase().match(verseRegexp)
      if (!matches || matches.length < 3) {
        return
      }

      const [, bookName, chapter] = matches

      const bookNumber = getBookNumberByName(bookName)

      if (bookNumber) {
        const verses = await ipcRenderer.invoke('getBibleVerses', uid, {
          bookNumber,
          chapter,
        })
        setVerses(prepareVerses(verses, getStrongNumbersPrefix(info), handleVerseMouseEnter))
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
    setVerses(prepareVerses(verses, getStrongNumbersPrefix(info), handleVerseMouseEnter))
  }, [handleVerseMouseEnter])

  useEffect(() => {
    getBible()
  }, [getBible])

  return {
    info,
    verses,
    language,
    verseClass,
    handleSearchSubmit,
  }
}

export default useBase
