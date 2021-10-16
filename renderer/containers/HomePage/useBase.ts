import { useCallback, useEffect, useRef, useState } from 'react'
import { IDimensions } from 'components/types'
import { Tab } from 'components'

const useBase = () => {
  const targetRef = useRef<HTMLDivElement>()
  const [dimensions, setDimensions] = useState<IDimensions>({ width: '100%', height: '100%' })

  const onResize = useCallback(() => {
    setDimensions({
      width: targetRef.current.offsetWidth,
      height: targetRef.current.offsetHeight,
    })
  }, [])

  const onTabsChange = useCallback((index: number, value: string) => {
    console.info('onTabsChange', index, value)
  }, [])

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      })

      window.addEventListener('resize', onResize)
    }

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [targetRef])

  return { targetRef, dimensions, onTabsChange }
}

export default useBase
