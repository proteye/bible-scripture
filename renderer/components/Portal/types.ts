import { ReactNode } from 'react'

import { IComponentDefaultProps } from '../types'

export interface IPortalProps extends IComponentDefaultProps {
  children?: ReactNode
}
