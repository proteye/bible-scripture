import { IComponentDefaultProps } from 'components/types'
import Tab from '.'

export interface ITabProps extends IComponentDefaultProps {
  label?: string
  value?: string
  onActive?(index: number, value: string): void
  onClose?(index: number, value: string): void
}
