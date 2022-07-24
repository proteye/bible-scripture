import { useEffect, useCallback, useMemo, useState } from 'react'
import useDimensions from 'hooks/useDimensions'
import { getNumberFromString } from 'helpers/getNumberFromString'
import { ITabProps } from 'components/Tab/types'
import { ipcRenderer } from 'electron'
import {
  IDictionaryDictionary,
  IDictionaryMorphologyIndication,
  TModulesList,
  TLookupDictionaryList,
} from '@common/types'
import { nanoid } from 'nanoid'
import useTabs from 'hooks/useTabs'
import { defaultTheme } from 'constants/theme'
import useVisibleSwitch from 'hooks/useVisibleSwitch'
import { TSelectedDictionaries } from 'types/dictionary'

const dictionaryModuleName = 'Журом'

const useBase = () => {
  const [bibles, setBibles] = useState<TModulesList>([])
  const [dictionaries, setDictionaries] = useState<TLookupDictionaryList>([])
  const [selectedDictionaries, setSelectedDictionaries] = useState<TSelectedDictionaries>({})
  const [tabs, setTabs] = useState<ITabProps[]>([])
  const [topic, setTopic] = useState<IDictionaryDictionary>(null)
  const [morphology, setMorphology] = useState<IDictionaryMorphologyIndication[]>([])
  const [isShowInstant, toggleShowInstant] = useVisibleSwitch(true)
  const [isShowModules, toggleShowModules] = useVisibleSwitch(false)
  const [isShowDictionarySettings, toggleShowDictionarySettings] = useVisibleSwitch(false)

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

  const contextMenuItems = useMemo(() => bibles.map(({ name }) => ({ title: name, value: name })), [bibles])

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

  const closeTabsByModuleName = useCallback(
    (moduleName: string) => {
      const isExist = tabs.find(({ value }) => moduleName === value)

      if (isExist) {
        setTabs((prevState) => prevState.filter(({ value }) => moduleName !== value))
        handleSelectTab(0)
      }
    },
    [tabs, handleSelectTab],
  )

  const getModules = useCallback(async () => {
    const modules: TModulesList = await ipcRenderer.invoke('getModules')
    const bibles = modules.filter(({ type }) => type === 'bible')
    setBibles(bibles)
  }, [])

  const getDictionaries = useCallback(async () => {
    const dictionaries = await ipcRenderer.invoke('getLookupDictionaries')
    setDictionaries(dictionaries)
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

  useEffect(() => {
    getModules()
    getDictionaries()
    openDictionary()

    return () => {
      ipcRenderer.invoke('closeDictionaryByUid', uid)
    }
  }, [getModules, getDictionaries, openDictionary])

  // Clear Instant when closed
  useEffect(() => {
    if (!isShowInstant) {
      setTopic(null)
      setMorphology([])
    }
  }, [isShowInstant])

  // Refetch modules
  useEffect(() => {
    if (!isShowModules) {
      getModules()
    }
  }, [isShowModules, getModules])

  useEffect(() => {
    if (!isShowModules) {
      getModules()
    }
  }, [isShowModules, getModules])
  useEffect(() => {
    ipcRenderer.on('main-menu-command', (_e, menuItemId) => {
      switch (menuItemId) {
        case 'downloadModules':
          toggleShowModules()
          break
        case 'dictionarySettings':
          toggleShowDictionarySettings()
          break
        case 'preferences':
          break
        case 'instantDetails':
          toggleShowInstant()
          break
      }
    })
  }, [])

  useEffect(() => {
    ipcRenderer.send('isShowInstantDetails', isShowInstant)
  }, [isShowInstant])

  return {
    tabs,
    targetRef,
    selectedIndex,
    dimensions: { width, height: scrollHeight },
    contextMenuItems,
    instantHtmlText,
    dictionaries,
    selectedDictionaries,
    isShowInstant,
    isShowModules,
    isShowDictionarySettings,
    handleChangeTab,
    handleAddTab,
    handleCloseTab,
    handleGetDictionaryTopic,
    setSelectedDictionaries,
    closeTabsByModuleName,
    toggleShowInstant,
    toggleShowModules,
    toggleShowDictionarySettings,
  }
}

export default useBase
