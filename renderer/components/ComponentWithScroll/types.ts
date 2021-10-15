import { ReactNode } from 'react'
import { IComponentWithDimensions } from 'components/types'

export interface IComponentWithScrollProps extends IComponentWithDimensions {
  children?: ReactNode
}
