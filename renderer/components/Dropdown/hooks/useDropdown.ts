import { MouseEvent, useCallback, useRef, useState } from 'react'
import { useDebouncedFn, useWindowResize } from 'beautiful-react-hooks'

import { IDroplistPosition } from '../types'
import { IUseDropdown } from './types'

import { TOGGLE_DURATION } from '../constants'

export const useDropdown = (): IUseDropdown => {
  const [position, setPosition] = useState<IDroplistPosition>()
  const [isOpen, setIsOpen] = useState(false)
  const anchorRef = useRef<Element>()

  const close = useCallback(() => {
    setIsOpen(false)
    // задержка требуется для завершения анимации закрытия AbsoluteWrapper
    setTimeout(setPosition, TOGGLE_DURATION)
  }, [setIsOpen, setPosition])

  /** Пересчет необходим в случаях изменения положения элемента-триггера на странице */
  const onResize = () => {
    if (position && anchorRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setPosition(computePosition(anchorRef.current))
    }
  }

  const onClick = useCallback(
    (evt: MouseEvent) => {
      if (isOpen) {
        close()

        return
      }
      anchorRef.current = evt.currentTarget
      setIsOpen(true)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setPosition(computePosition(evt.currentTarget))
    },
    [isOpen, close, setIsOpen, setPosition],
  )

  useWindowResize(useDebouncedFn(onResize, 10))

  return {
    isOpen,
    position,
    close,
    onClick,
  }
}

/** Определение абсолютной координаты Droplist по положению элемента-триггера */
function computePosition(target: Element) {
  const rect = target.getBoundingClientRect()

  return {
    top: rect.top + window.pageYOffset + rect.height, // y1 элемента-триггера
    left: rect.left + window.pageXOffset, // x0 элемента-триггера
  }
}
