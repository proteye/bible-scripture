import { CSSProperties } from 'react'
import { IDimensions } from 'hooks/useDimensions/types'

export interface IComponentDefaultProps {
  className?: string
  style?: CSSProperties
  qa?: string
}

export interface IComponentWithDimensions extends IComponentDefaultProps {
  dimensions?: IDimensions
}
