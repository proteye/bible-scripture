import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { nanoid } from 'nanoid'
import { IBibleInfo, IBibleBook } from '@common/types'
import { IBiblePreapredVerse, IBibleViewProps } from './types'
import { getBookNumberByName } from 'helpers/getBookNumber'
import { verseRegexp } from './constants'
import { getStrongNumbersPrefix, prepareVerses } from './helpers'

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
