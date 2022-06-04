import React, { ChangeEvent, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isNil } from '@dasreda/helpers'

import { IInputProps } from './types'

import {
  HintStyled,
  InputStyled,
  InputWrapperStyled,
  LabelStyled,
  PrefixStyled,
  RootStyled,
  SuffixStyled,
  WrapperStyled,
} from './styled.index'

/**
 * Input
 * */

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      readOnly,
      hint,
      focus,
      error,
      value,
      defaultValue,
      className,
      style,
      qa,
      inputSize: inputSizeProp,
      shapeType,
      onChange,
      onFocus,
      type,
      prefix,
      suffix,
      autoFocus,
      color,
      isLMS,
      children,
      ...rest
    },
    ref,
  ) => {
    const [ownValue, setOwnValue] = useState<string>(defaultValue)
    const inputSize = isLMS ? 'small' : inputSizeProp

    const isUncontrolledMode = useMemo(() => typeof value === 'undefined', [value])

    const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>): void => {
      if (isUncontrolledMode) {
        setOwnValue(evt.target.value)
      }

      onChange?.(evt)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputRef = useRef<HTMLInputElement>()

    const resultValue = isUncontrolledMode ? ownValue : value
    const isActive = Boolean(resultValue)
    const hasPrefix = useMemo(() => !isNil(prefix) && prefix !== false, [prefix])

    useEffect(() => {
      if (!inputRef.current || !ref) {
        return
      }

      if (typeof ref === 'function') {
        ref(inputRef.current)
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = inputRef.current
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef.current, ref])

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (autoFocus) {
          inputRef.current?.select()
        }
      }, 100)

      return () => {
        clearTimeout(timeoutId)
      }
    }, [autoFocus])

    return (
      <RootStyled className={className} style={style} data-qa={qa}>
        <WrapperStyled
          isActive={isActive}
          isError={error}
          readOnly={readOnly}
          $shapeType={shapeType}
          $inputSize={inputSize}
        >
          {label?.length > 0 && (
            <LabelStyled $shapeType={shapeType} $inputSize={inputSize} $type={type}>
              {label}
            </LabelStyled>
          )}
          <InputWrapperStyled
            $hasPrefix={hasPrefix}
            $hasSuffix={hasPrefix}
            $inputSize={inputSize}
            $shapeType={shapeType}
          >
            {hasPrefix && (
              <PrefixStyled $inputSize={inputSize} $shapeType={shapeType}>
                {prefix}
              </PrefixStyled>
            )}
            <InputStyled
              ref={inputRef}
              autoFocus={autoFocus}
              $focus={focus}
              readOnly={readOnly}
              onChange={handleChange}
              onFocus={onFocus}
              isError={error}
              value={resultValue || ''}
              data-qa={`${qa}__field`}
              $inputSize={inputSize}
              $shapeType={shapeType}
              type={type}
              $color={color}
              {...rest}
            />
            {suffix !== undefined && (
              <SuffixStyled $inputSize={inputSize} $shapeType={shapeType} $isLMS={isLMS}>
                {suffix}
              </SuffixStyled>
            )}
          </InputWrapperStyled>
        </WrapperStyled>
        {hint && (
          <HintStyled isError={error} $shapeType={shapeType}>
            {hint}
          </HintStyled>
        )}
        {children}
      </RootStyled>
    )
  },
)

Input.displayName = 'Input'

Input.defaultProps = {
  type: 'text',
  error: false,
  hint: null,
  autoFocus: null,
  readOnly: false,
  defaultValue: '',
  qa: 'Input',
  inputSize: 'large',
  shapeType: 'outlined',
  color: 'emerald',
  children: null,
}

export default Input
