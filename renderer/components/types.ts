import { CSSProperties } from 'react'
import { AppDefaultTheme } from 'theme/types'

export interface IComponentDefaultProps {
  className?: string
  style?: CSSProperties
  qa?: string
}

export interface IStyledTheme {
  theme: AppDefaultTheme
}

export interface IDimensions {
  width: string | number
  height: string | number
}

export interface IComponentWithDimensions extends IComponentDefaultProps {
  dimensions?: IDimensions
}

export interface IStyledThemeWithDimensions extends IStyledTheme {
  $dimensions?: IDimensions
}
