import React, { forwardRef, MouseEvent, useCallback, useLayoutEffect, useRef } from 'react'
import mergeRefs from 'react-merge-refs'

import { IDroplistProps } from './types'

import { DROPLIST_SCROLL_DEFAULT_HEIGHT } from 'components/Dropdown/constants'
import { Scrollable } from 'components/Scrollable'

import {
  StyledChecked,
  StyledDroplist,
  StyledDroplistCancel,
  StyledDroplistHeader,
  StyledDroplistItem,
  StyledDroplistItems,
  StyledDroplistTitle,
} from './styled.index'

const Droplist = forwardRef<HTMLDivElement, IDroplistProps>(
  ({ droplistWidthAsInput, isPanel, inputRef, items, size, title, value, onSelect, close, height }, ref) => {
    const droplistRef = useRef<HTMLDivElement>()

    const handleClick = (val: string) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallback(
        (e: MouseEvent) => {
          e.preventDefault()
          onSelect(val)
        },
        [val],
      )

    useLayoutEffect(() => {
      if (droplistWidthAsInput && inputRef) {
        droplistRef.current.style.width = `${inputRef.current.offsetWidth}px`
      }
    }, [droplistWidthAsInput, inputRef])

    return (
      <StyledDroplist ref={mergeRefs([droplistRef, ref])} $isPanel={isPanel}>
        {isPanel && (
          <StyledDroplistHeader>
            <StyledDroplistTitle>{title}</StyledDroplistTitle>
            <StyledDroplistCancel onClick={close}>Отменить</StyledDroplistCancel>
          </StyledDroplistHeader>
        )}
        <Scrollable height={height || DROPLIST_SCROLL_DEFAULT_HEIGHT}>
          <StyledDroplistItems>
            {items.map((item) => {
              const checkmark = item.value === value ? <StyledChecked /> : null
              const content = (
                <>
                  {item.text}
                  {checkmark}
                </>
              )

              return (
                <StyledDroplistItem key={item.value} $size={size} onClick={handleClick(item.value)}>
                  {content}
                </StyledDroplistItem>
              )
            })}
          </StyledDroplistItems>
        </Scrollable>
      </StyledDroplist>
    )
  },
)

Droplist.displayName = 'Droplist'

export default Droplist
