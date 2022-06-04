import { IComponentDefaultProps } from 'components/types'

export interface IContextMenuItem {
  title: string
  value: string
}

export interface IContextMenuProps extends IComponentDefaultProps {
  label?: string
  items?: IContextMenuItem[]
  onSelect?(value: string): void
}
