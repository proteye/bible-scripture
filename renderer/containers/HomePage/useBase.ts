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

  const contextMenuItems = useMemo(() => bibles.map(({ id, shortName }) => ({ title: shortName, value: id })), [bibles])

  const onTabsChange = useCallback((index: number, value: string) => {
    console.info('onTabsChange', index, value)
  }, [])

  const onCloseTab = useCallback((index: number) => {
    setTabs((prevState) => prevState.filter((_, i) => i !== index))
  }, [])

  const onSelectBible = useCallback((value: string) => {
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
    dimensions: { width, height: Number(height) - getNumberFromString(defaultTheme.tabBar.height) },
    contextMenuItems,
    onTabsChange,
    onCloseTab,
    onSelectBible,
  }
}

export default useBase
