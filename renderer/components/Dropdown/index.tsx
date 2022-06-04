import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import mergeRefs from 'react-merge-refs'

import { IDropdownProps, TDropdownValue } from './types'

import useDevice from 'components/Header/hooks/useDevice'
import Portal from 'components/Portal'

import { useDropdown } from './hooks/useDropdown'

import Droplist from './components/Droplist'
import DroplistAbsoluteWrapper from './components/DroplistAbsoluteWrapper'
import {
  SDropDropDownInput,
  StyledDropdownStatus,
  StyledDropdownStatusLg,
  StyledInputTrigger,
  StyledInputWrapper,
} from './index.styled'

export const Dropdown = forwardRef<HTMLInputElement, IDropdownProps>(
  (
    {
      droplistWidthAsInput,
      items,
      placeholder,
      size,
      title,
      value,
      onSelect,
      qa,
      style,
      className,
      height,
      droplistZIndex,
      readOnly,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>()
    const triggerRef = useRef<HTMLDivElement>()
    const { isOpen, position, close, onClick } = useDropdown()
    const [localValue, setLocalValue] = useState<TDropdownValue>(value)
    const device = useDevice()
    const isPanel = useMemo(() => device === 'mobile', [device])

    const onSelectLocal = (nextValue: string) => {
      setLocalValue(nextValue)
      onSelect?.(nextValue)
      close()
    }

    useEffect(() => {
      if (inputRef.current && value !== undefined && localValue !== value) {
        setLocalValue(value)
        close()
      }
    }, [close, localValue, value])

    // Пустое значение требуется для включения controlled mode в Input
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const text = useMemo<string>(() => items.find((item) => item.value === localValue)?.text ?? '', [items, localValue])

    return (
      <StyledInputWrapper $isOpen={isOpen} $size={size} style={style} className={className} data-qa={qa}>
        <SDropDropDownInput
          ref={mergeRefs([inputRef, ref])}
          inputSize={size}
          placeholder={placeholder}
          value={text}
          focus={isOpen}
          qa={qa}
          readOnly={readOnly}
        />
        {!readOnly && <StyledInputTrigger onClick={onClick} data-qa="Dropdown-Trigger" ref={triggerRef} />}
        {size === 'small' ? <StyledDropdownStatus /> : <StyledDropdownStatusLg />}
        {position !== undefined && (
          <Portal>
            <DroplistAbsoluteWrapper
              isPanel={isPanel}
              close={close}
              position={position}
              isOpen={isOpen}
              triggerRef={triggerRef}
              zIndex={droplistZIndex}
            >
              <Droplist
                close={close}
                droplistWidthAsInput={isPanel ? false : droplistWidthAsInput}
                isPanel={isPanel}
                size={isPanel ? 'medium' : size}
                items={items}
                value={localValue}
                onSelect={onSelectLocal}
                title={title}
                inputRef={inputRef}
                height={height}
              />
            </DroplistAbsoluteWrapper>
          </Portal>
        )}
      </StyledInputWrapper>
    )
  },
)

Dropdown.displayName = 'Dropdown'

Dropdown.defaultProps = {
  size: 'large',
  qa: 'Dropdown',
}

export default Dropdown
