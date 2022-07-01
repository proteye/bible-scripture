import { isServer } from 'helpers/isServer'
import { useEffect, useRef } from 'react'
import { addRootElement } from './helpers'

const usePortal = (className?: string, qa?: string): HTMLElement => {
  const rootElemRef = useRef<HTMLElement | null>(isServer() ? null : document.createElement('div'))
  const root = rootElemRef?.current

  useEffect(() => {
    addRootElement(root)

    if (className) {
      const listClassName = className.split(' ')
      root.classList.add(...listClassName)
    }

    if (qa) {
      root.setAttribute('data-qa', qa)
    }

    return () => {
      root.remove()
    }
  }, [className, qa, root])

  return root
}

export default usePortal
