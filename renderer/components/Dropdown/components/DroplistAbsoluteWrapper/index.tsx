import React, { FC, useEffect, useRef } from 'react'
import { useAnimationOptions } from '@dasreda/hooks'

import { IDroplistAbsoluteWrapperProps } from './types'

import { TOGGLE_DURATION } from 'components/Dropdown/constants'

import { StyledDroplistAbsoluteWrapper, StyledDroplistMobileBackdrop } from './index.styled'

export const DroplistAbsoluteWrapper: FC<IDroplistAbsoluteWrapperProps> = ({
  close,
  isPanel,
  isOpen,
  position,
  zIndex,
  triggerRef,
  children,
}) => {
  const ref = useRef<HTMLDivElement>()
  const { animationControls, animationVariants } = useAnimationOptions({
    isVisible: isOpen,
    y0: 30,
    y1: 0,
    delay: 0,
    duration: TOGGLE_DURATION / 1000,
  })

  useEffect(() => {
    const onClick = (evt: MouseEvent) => {
      if (ref.current.contains(evt.target as HTMLElement)) {
        return
      }

      if (ref.current === evt.target) {
        return
      }

      if (triggerRef.current === evt.target) {
        return
      }

      close()
    }

    document.addEventListener('click', onClick, false)

    return () => {
      document.removeEventListener('click', onClick, false)
    }
  }, [triggerRef, close])

  return (
    <>
      {isPanel && <StyledDroplistMobileBackdrop />}
      <StyledDroplistAbsoluteWrapper
        ref={ref}
        $isPanel={isPanel}
        $position={position}
        $zIndex={zIndex}
        variants={animationVariants}
        initial="hidden"
        animate={animationControls}
      >
        {children}
      </StyledDroplistAbsoluteWrapper>
    </>
  )
}

export default DroplistAbsoluteWrapper
