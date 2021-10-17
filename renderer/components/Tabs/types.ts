import { ReactNode } from 'react'
import { IComponentDefaultProps, IStyledTheme } from 'components/types'
import { Tab } from 'components'
import { ITabProps } from 'components/Tab/types'

export interface ITabsProps extends IComponentDefaultProps {
  defaultSelectedIndex?: number
  children?: ReactNode
  onChange?(
    index: number,
    value: string,
    tab?: React.ReactElement<typeof Tab>,
    event?: React.MouseEvent<HTMLLIElement>,
  ): void
}

export interface ITab extends Omit<ITabProps, 'onActive'> {
  index: number
  isActive: boolean
  children: ReactNode
  onActive?(e: React.MouseEvent<HTMLLIElement>): void
  onClose?(index: number, value: string): void
}

export interface ISTab extends IStyledTheme {
  $isActive: boolean
}
