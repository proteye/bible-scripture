import { useCallback, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IBibleVerse, IBibleInfo } from 'common/types'
import { EBibleNames } from './types'

const BIBLE_NAME = EBibleNames.RST_STRONG.toString()

const useBase = () => {
  const [info, setInfo] = useState<IBibleInfo[]>([])
  const [verses, setVerses] = useState<IBibleVerse[]>([])

  const getBible = useCallback(async () => {
    await ipcRenderer.invoke('openModule', BIBLE_NAME)
    const info = await ipcRenderer.invoke('getBibleInfo', BIBLE_NAME)
    const books = await ipcRenderer.invoke('getBibleBooks', BIBLE_NAME)
    const verses = await ipcRenderer.invoke('getBibleVerses', BIBLE_NAME, {
      bookNumber: books[0].bookNumber,
      chapter: 1,
    })
    setInfo(info)
    setVerses(verses)
  }, [])

  useEffect(() => {
    getBible()
  }, [getBible])

  return {
    info,
    verses,
  }
}

export default useBase
