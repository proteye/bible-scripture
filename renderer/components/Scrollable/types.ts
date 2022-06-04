import { ReactNode } from 'react'
import { IComponentWithDimensions } from 'components/types'

export interface IScrollableProps extends IComponentWithDimensions {
  children?: ReactNode
}
