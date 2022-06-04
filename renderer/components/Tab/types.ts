import { IComponentDefaultProps } from 'components/types'
import { ReactNode } from 'react'

export interface ITabProps extends IComponentDefaultProps {
  label?: string
  value?: string
  type?: ETabType
  children?: ReactNode
  onActive?(index: number, value: string): void
  onClose?(index: number, value: string): void
}

export enum ETabType {
  tab,
  button,
}
