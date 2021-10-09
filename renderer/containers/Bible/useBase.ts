import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { BibleVerse } from '@/types'

const useBase = () => {
  const [verses, setVerses] = useState<BibleVerse[]>([])

  useEffect(() => {
    const verses = ipcRenderer.sendSync('get-bible-verses')
    setVerses(verses)
    console.log('verses', verses)
  }, [])

  return {
    verses,
  }
}

export default useBase
