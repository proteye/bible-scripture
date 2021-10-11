import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IBibleVerse, IBibleInfo } from '@/types'
import { EBibleNames } from './types'

const BIBLE_NAME = EBibleNames.RST_STRONG.toString()

const useBase = () => {
  const [info, setInfo] = useState<IBibleInfo[]>([])
  const [verses, setVerses] = useState<IBibleVerse[]>([])

  useEffect(() => {
    ipcRenderer.sendSync('openBible', BIBLE_NAME)
    const info = ipcRenderer.sendSync('getBibleInfo', BIBLE_NAME)
    const books = ipcRenderer.sendSync('getBibleBooks', BIBLE_NAME)
    const verses = ipcRenderer.sendSync('getBibleVerses', BIBLE_NAME, { bookNumber: books[0].bookNumber })
    setInfo(info)
    setVerses(verses)
  }, [])

  return {
    info,
    verses,
  }
}

export default useBase
