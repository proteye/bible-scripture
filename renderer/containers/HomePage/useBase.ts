import { useCallback } from 'react'
import useDimensions from 'hooks/useDimensions'
import { defaultTheme } from 'theme'
import { getNumberFromString } from 'helpers/getNumberFromString'

const useBase = () => {
  const {
    targetRef,
    dimensions: { width, height },
  } = useDimensions()

  const onTabsChange = useCallback((index: number, value: string) => {
    console.info('onTabsChange', index, value)
  }, [])

  return {
    targetRef,
    dimensions: { width, height: Number(height) - getNumberFromString(defaultTheme.tabBar.height) },
    onTabsChange,
  }
}

export default useBase
