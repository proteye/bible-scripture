import { useEffect, useCallback, useMemo, useState } from 'react'
import useDimensions from 'hooks/useDimensions'
import { defaultTheme } from 'theme'
import { getNumberFromString } from 'helpers/getNumberFromString'
import { ITabProps } from 'components/Tab/types'
import { ipcRenderer } from 'electron'
import { IDictionaryDictionary, TModulesList } from '@common/types'
import { nanoid } from 'nanoid'

const dictionaryModuleName = 'Журом'

const useBase = () => {
  const [bibles, setBibles] = useState<TModulesList>([])
  const [tabs, setTabs] = useState<ITabProps[]>([])
  const [topic, setTopic] = useState<IDictionaryDictionary>(null)

  const {
    targetRef,
    dimensions: { width, height },
  } = useDimensions()

  const scrollHeight =
    Number(height) -
    getNumberFromString(defaultTheme.tabBar.height) -
    getNumberFromString(defaultTheme.searchBar.height) -
    getNumberFromString(defaultTheme.instantView.height)

  const uid = useMemo(() => nanoid(), [])

  const contextMenuItems = useMemo(() => bibles.map(({ id, shortName }) => ({ title: shortName, value: id })), [bibles])

  const handleTabsChange = useCallback((index: number, value: string) => {
    console.info('handleTabsChange', index, value)
  }, [])

  const handleAddTab = useCallback((value: string) => {
    setTabs((prevState) => [...prevState, { value, label: value }])
  }, [])

  const handleCloseTab = useCallback((index: number) => {
    setTabs((prevState) => prevState.filter((_, i) => i !== index))
  }, [])

  const getModules = useCallback(async () => {
    const modules = await ipcRenderer.invoke('getModules')

    const bibles = modules.filter(({ type }) => type === 'bible')
    setBibles(bibles)
  }, [])

  const openDictionary = useCallback(async () => {
    await ipcRenderer.invoke('openDictionary', dictionaryModuleName, uid)
  }, [uid])

  const handleGetDictionaryTopic = useCallback(async (topic: string) => {
    const result = await ipcRenderer.invoke('getDictionaryByTopic', uid, { topic })
    setTopic(result)
  }, [])

  useEffect(() => {
    getModules()
    openDictionary()

    return () => {
      ipcRenderer.invoke('closeDictionaryByUid', uid)
    }
  }, [getModules])

  return {
    tabs,
    targetRef,
    dimensions: { width, height: scrollHeight },
    instantDimensions: { width, height: defaultTheme.instantView.height },
    contextMenuItems,
    topic,
    handleTabsChange,
    handleAddTab,
    handleCloseTab,
    handleGetDictionaryTopic,
  }
}

export default useBase
