import { useEffect, useCallback, useMemo, useState } from 'react'
import useDimensions from 'hooks/useDimensions'
import { getNumberFromString } from 'helpers/getNumberFromString'
import { ITabProps } from 'components/Tab/types'
import { ipcRenderer } from 'electron'
import { IDictionaryDictionary, IDictionaryMorphologyIndications, TModulesList } from '@common/types'
import { nanoid } from 'nanoid'
import useTabs from 'hooks/useTabs'
import { defaultTheme } from 'constants/theme'

const dictionaryModuleName = 'Журом'

const useBase = () => {
  const [bibles, setBibles] = useState<TModulesList>([])
  const [tabs, setTabs] = useState<ITabProps[]>([])
  const [topic, setTopic] = useState<IDictionaryDictionary>(null)
  const [morphology, setMorphology] = useState<IDictionaryMorphologyIndications[]>([])
  const [isShowInstant, setShowInstant] = useState(true)

  const morphologyMeaningHtml = useMemo(() => {
    const meanings = morphology.map(({ meaning }) => meaning)
    return meanings.length > 0 ? `<p>${meanings.join(', ')}</p>` : ''
  }, [morphology])
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

  const handleChangeTab = useCallback(
    (index: number) => {
      handleSelectTab(index)
    },
    [handleSelectTab],
  )

  const handleAddTab = useCallback(
    (value: string) => {
      setTabs((prevState) => [...prevState, { value, label: value }])
      handleSelectTab(tabs.length)
    },
    [tabs, handleSelectTab],
  )

  const handleCloseTab = useCallback(
    (index: number) => {
      setTabs((prevState) => prevState.filter((_, i) => i !== index))
      if (selectedIndex === tabs.length - 1) {
        handleSelectTab(tabs.length - 2)
      }
      if (index < selectedIndex) {
        handleSelectTab(selectedIndex - 1)
      }
    },
    [tabs, selectedIndex, handleSelectTab],
  )

  const getModules = useCallback(async () => {
    const modules = await ipcRenderer.invoke('getModules')

    const bibles = modules.filter(({ type }) => type === 'bible')
    setBibles(bibles)
  }, [])

  const getRegistry = useCallback(async () => {
    const registry = await ipcRenderer.invoke('getRegistry')
  }, [])

  const openDictionary = useCallback(async () => {
    await ipcRenderer.invoke('openDictionary', dictionaryModuleName, uid)
  }, [uid])

  const handleGetDictionaryTopic = useCallback(
    async (topic: string, morphologyIndication?: string) => {
      if (!isShowInstant) {
        return
      }

      const result = await ipcRenderer.invoke('getDictionaryByTopic', uid, { topic })
      const morphology = morphologyIndication
        ? await ipcRenderer.invoke('getMorphologyIndication', uid, { indication: morphologyIndication })
        : []

      setTopic(result)
      setMorphology(morphology)
    },
    [isShowInstant],
  )

  const toggleInstant = useCallback(async () => {
    setShowInstant((prevValue) => !prevValue)
  }, [])

  useEffect(() => {
    getModules()
    getRegistry()
    openDictionary()

    return () => {
      ipcRenderer.invoke('closeDictionaryByUid', uid)
    }
  }, [getModules, getRegistry, openDictionary])

  // Clear Instant when closed
  useEffect(() => {
    if (!isShowInstant) {
      setTopic(null)
      setMorphology([])
    }
  }, [isShowInstant])

  return {
    tabs,
    targetRef,
    selectedIndex,
    dimensions: { width, height: scrollHeight },
    contextMenuItems,
    instantHtmlText,
    isShowInstant,
    handleChangeTab,
    handleAddTab,
    handleCloseTab,
    handleGetDictionaryTopic,
    toggleInstant,
  }
}

export default useBase
