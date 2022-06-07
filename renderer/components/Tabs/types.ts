import { ReactNode } from 'react'
import { IComponentDefaultProps } from 'components/types'
import { Tab } from 'components'
import { ITabProps } from 'components/Tab/types'

export interface ITabsProps extends IComponentDefaultProps {
  selectedIndex?: number
  children?: ReactNode
  onChange?(
    index: number,
    value: string,
    tab?: React.ReactElement<typeof Tab>,
    event?: React.MouseEvent<HTMLLIElement>,
  ): void
}

export interface ITab extends Omit<ITabProps, 'onActive' | 'onClose'> {
  index: number
  children: ReactNode
  isActive?: boolean
  onActive?(e: React.MouseEvent<HTMLLIElement>): void
  onClose?(e: React.MouseEvent<HTMLLIElement>): void
}
