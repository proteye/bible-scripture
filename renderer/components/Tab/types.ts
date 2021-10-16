import { IComponentDefaultProps } from 'components/types'
import Tab from '.'

export interface ITabProps extends IComponentDefaultProps {
  label?: string
  value?: string
  onActive?(tab: typeof Tab): void
}
