import { ChangeEvent, FocusEvent, ReactNode } from 'react'

import { IComponentDefaultProps } from '../types'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'url'

export type InputSize = 'small' | 'medium' | 'large'

export type InputShapeType = 'outlined' | 'underlined'

type InputColor = 'emerald' | 'white'

export interface IInputProps extends IComponentDefaultProps {
  /** Тип input (text | password | email | number) */
  type?: InputType
  /** Label */
  label?: string
  /** Имя */
  name?: string
  /** Controlled состояние фокусировки */
  focus?: boolean
  /** Текст ошибок */
  error?: boolean
  /** Автофокус */
  autoFocus?: boolean
  /** Заблокированная форма */
  readOnly?: boolean
  /** Подсказка */
  hint?: string
  /** Placeholder */
  placeholder?: string
  /** Значение */
  value?: string
  /** Значение по умолчанию (для uncontrolled) */
  defaultValue?: string
  /** Размер */
  inputSize?: InputSize
  /** Форма поля, по умолчанию `outlined` */
  shapeType?: InputShapeType
  /** ReactNode поверх инпута слева */
  prefix?: ReactNode
  /** ReactNode поверх инпута справа */
  suffix?: ReactNode
  /** Атрибут указывающий на версию для LMS */
  isLMS?: boolean
  /** onChange callback */
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void
  /** onFocus callback */
  onFocus?: (evt: FocusEvent) => void
  /** onClick callback */
  onClick?: () => void
  /** Цвет инпута */
  color?: InputColor
  /** Дочерние элементы */
  children?: ReactNode
}

export interface IColorStyled {
  $color: InputColor
}

export interface IInputStyled {
  isError?: boolean
  isActive?: boolean
  readOnly?: boolean
  /** Controlled состояние фокусировки */
  $focus?: boolean
  /** Размер */
  $inputSize?: InputSize
  /** Форма */
  $shapeType?: InputShapeType
}

export interface IInputWrapperStyled {
  /** имеет ли ReactNode поверх инпута слева */
  $hasPrefix: boolean
  /** имеет ли ReactNode поверх инпута справа */
  $hasSuffix: boolean
  $inputSize: InputSize
  $shapeType?: InputShapeType
}

export interface IPrefixStyled {
  $inputSize: InputSize
  $shapeType?: InputShapeType
}

export type TSuffixStyled = IPrefixStyled & {
  /** Атрибут указывающий на версию для LMS */
  $isLMS?: boolean
}

export type TLabelStyled = IInputStyled & {
  $type: HTMLButtonElement['type']
}
