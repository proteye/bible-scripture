import { useEffect, useCallback, useMemo, useState } from 'react'
import useDimensions from 'hooks/useDimensions'
import { defaultTheme } from 'theme'
import { getNumberFromString } from 'helpers/getNumberFromString'
import { ITabProps } from 'components/Tab/types'
import { ipcRenderer } from 'electron'
import { TModulesList } from '@common/types'

const useBase = () => {
  const [bibles, setBibles] = useState<TModulesList>([])
  const [tabs, setTabs] = useState<ITabProps[]>([])

  const {
    targetRef,
    dimensions: { width, height },
  } = useDimensions()

  const scrollHeight =
    Number(height) -
    getNumberFromString(defaultTheme.tabBar.height) -
    getNumberFromString(defaultTheme.searchBar.height)

  const contextMenuItems = useMemo(() => bibles.map(({ id, shortName }) => ({ title: shortName, value: id })), [bibles])

  const handleTabsChange = useCallback((index: number, value: string) => {
    console.info('handleTabsChange', index, value)
  }, [])

  const handleCloseTab = useCallback((index: number) => {
    setTabs((prevState) => prevState.filter((_, i) => i !== index))
  }, [])

  const handleSelectBible = useCallback((value: string) => {
    setTabs((prevState) => [...prevState, { value, label: value }])
  }, [])

  const getModules = useCallback(async () => {
    const modules = await ipcRenderer.invoke('getModules')

    const bibles = modules.filter(({ type }) => type === 'bible')
    setBibles(bibles)
  }, [])

  useEffect(() => {
    getModules()
  }, [])

  return {
    tabs,
    targetRef,
    dimensions: { width, height: scrollHeight },
    contextMenuItems,
    handleTabsChange,
    handleCloseTab,
    handleSelectBible,
  }
}

export default useBase
