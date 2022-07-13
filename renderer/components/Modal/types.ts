import { ReactNode } from 'react'
import { IComponentDefaultProps } from 'components/types'

export interface IModalProps extends IComponentDefaultProps {
  isVisible: boolean
  title?: string
  isShowClose?: boolean
  isClickableBackdrop?: boolean
  children?: ReactNode
  footer?: ReactNode
  onClose?(): void
}
