import { useCallback, useMemo, useState } from 'react'
import useDimensions from 'hooks/useDimensions'
import { defaultTheme } from 'theme'
import { getNumberFromString } from 'helpers/getNumberFromString'
import { EBibleNames } from 'containers/BibleView/types'
import { ITabProps } from 'components/Tab/types'

const useBase = () => {
  const [tabs, setTabs] = useState<ITabProps[]>([])

  const {
    targetRef,
    dimensions: { width, height },
  } = useDimensions()

  const contextMenuItems = useMemo(
    () => [
      { title: EBibleNames.RST_STR, value: EBibleNames.RST_STR },
      { title: EBibleNames.CAS, value: EBibleNames.CAS },
    ],
    [],
  )

  const onTabsChange = useCallback((index: number, value: string) => {
    console.info('onTabsChange', index, value)
  }, [])

  const onSelectBible = useCallback((value: string) => {
    setTabs((prevState) => [...prevState, { value, label: value }])
  }, [])

  return {
    tabs,
    targetRef,
    dimensions: { width, height: Number(height) - getNumberFromString(defaultTheme.tabBar.height) },
    contextMenuItems,
    onTabsChange,
    onSelectBible,
  }
}

export default useBase
