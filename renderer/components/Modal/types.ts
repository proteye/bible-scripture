import { ReactNode } from 'react'
import { IComponentDefaultProps } from 'components/types'

export interface IModalProps extends IComponentDefaultProps {
  isVisible: boolean
  title?: string
  children?: ReactNode
  onClose?(): void
}
