import { useEffect, useCallback, useMemo, useState } from 'react'
import useDimensions from 'hooks/useDimensions'
import { defaultTheme } from 'theme'
import { getNumberFromString } from 'helpers/getNumberFromString'
import { ITabProps } from 'components/Tab/types'
import { ipcRenderer } from 'electron'
import { IDictionaryDictionary, IDictionaryMorphologyIndications, TModulesList } from '@common/types'
import { nanoid } from 'nanoid'
import useTabs from 'hooks/useTabs'

const dictionaryModuleName = 'Журом'

const useBase = () => {
  const [bibles, setBibles] = useState<TModulesList>([])
  const [tabs, setTabs] = useState<ITabProps[]>([])
  const [topic, setTopic] = useState<IDictionaryDictionary>(null)
  const [morphology, setMorphology] = useState<IDictionaryMorphologyIndications>(null)

  const morphologyMeaningHtml = morphology ? `<p>${morphology.meaning}</p>` : ''
  const topicDefinitionHtml = topic?.definition || ''
  const instantHtmlText = morphologyMeaningHtml + topicDefinitionHtml

  const { selectedIndex, handleSelectTab } = useTabs()
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

  const handleChangeTab = useCallback((index: number) => {
    handleSelectTab(index)
  }, [handleSelectTab])

  const handleAddTab = useCallback((value: string) => {
    setTabs((prevState) => [...prevState, { value, label: value }])
    handleSelectTab(tabs.length)
  }, [tabs, handleSelectTab])

  const handleCloseTab = useCallback((index: number) => {
    setTabs((prevState) => prevState.filter((_, i) => i !== index))
    if (selectedIndex === tabs.length - 1) {
      handleSelectTab(tabs.length - 2)
    }
    if (index < selectedIndex) {
      handleSelectTab(selectedIndex - 1)
    }
  }, [tabs, selectedIndex, handleSelectTab])

  const getModules = useCallback(async () => {
    const modules = await ipcRenderer.invoke('getModules')

    const bibles = modules.filter(({ type }) => type === 'bible')
    setBibles(bibles)
  }, [])

  const openDictionary = useCallback(async () => {
    await ipcRenderer.invoke('openDictionary', dictionaryModuleName, uid)
  }, [uid])

  const handleGetDictionaryTopic = useCallback(async (topic: string, morphologyIndication?: string) => {
    const result = await ipcRenderer.invoke('getDictionaryByTopic', uid, { topic })
    const morphology = await ipcRenderer.invoke('getMorphologyIndication', uid, { indication: morphologyIndication })

    setTopic(result)
    setMorphology(morphology)
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
    selectedIndex,
    dimensions: { width, height: scrollHeight },
    contextMenuItems,
    instantHtmlText,
    handleChangeTab,
    handleAddTab,
    handleCloseTab,
    handleGetDictionaryTopic,
  }
}

export default useBase
