import { useCallback, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { nanoid } from 'nanoid'
import { IBibleVerse, IBibleInfo } from 'common/types'
import { EBibleNames } from './types'

const BIBLE_NAME = EBibleNames.RST_STRONG.toString()
const uid = nanoid()

const useBase = () => {
  const [info, setInfo] = useState<IBibleInfo[]>([])
  const [verses, setVerses] = useState<IBibleVerse[]>([])

  const getBible = useCallback(async () => {
    await ipcRenderer.invoke('openBible', BIBLE_NAME, uid)
    const info = await ipcRenderer.invoke('getBibleInfo', uid)
    const books = await ipcRenderer.invoke('getBibleBooks', uid)
    const verses = await ipcRenderer.invoke('getBibleVerses', uid, {
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
