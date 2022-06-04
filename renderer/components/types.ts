import { CSSProperties } from 'react'
import { AppDefaultTheme } from 'theme/types'
import { IDimensions } from 'hooks/useDimensions/types'

export interface IComponentDefaultProps {
  className?: string
  style?: CSSProperties
  qa?: string
}

export interface IStyledTheme {
  theme: AppDefaultTheme
}

export interface IComponentWithDimensions extends IComponentDefaultProps {
  dimensions?: IDimensions
}

export interface IStyledThemeWithDimensions extends IStyledTheme {
  $dimensions?: IDimensions
}

export interface IStyledThemeWithVisible extends IStyledTheme {
  $isVisible?: boolean
}
