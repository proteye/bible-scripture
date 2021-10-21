import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { nanoid } from 'nanoid'
import { IBibleVerse, IBibleInfo } from '@common/types'
import { IBibleViewProps } from './types'

const useBase = ({ moduleName }: IBibleViewProps) => {
  const [info, setInfo] = useState<IBibleInfo[]>([])
  const [verses, setVerses] = useState<IBibleVerse[]>([])

  const uid = useMemo(() => nanoid(), [])

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
