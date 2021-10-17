import { useCallback, useMemo } from 'react'
import useDimensions from 'hooks/useDimensions'
import { defaultTheme } from 'theme'
import { getNumberFromString } from 'helpers/getNumberFromString'
import { EBibleNames } from 'containers/BibleView/types'

const useBase = () => {
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

  return {
    targetRef,
    dimensions: { width, height: Number(height) - getNumberFromString(defaultTheme.tabBar.height) },
    contextMenuItems,
    onTabsChange,
  }
}

export default useBase
