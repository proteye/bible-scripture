import { useEffect, useRef, useState } from 'react'
import { IDimensions } from './types'

const initialState = { width: '100%', height: '100%' }

const useDimensions = () => {
  const targetRef = useRef<HTMLDivElement>()
  const [dimensions, setDimensions] = useState<IDimensions>(initialState)

  const onResize = () => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.clientWidth,
        height: targetRef.current.clientHeight,
      })
    }
  }

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [targetRef.current])

  return { targetRef, dimensions }
}

export default useDimensions
