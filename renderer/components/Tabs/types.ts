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

export interface ITab extends ITabProps {
  index: number
  isActive: boolean
  onTab(e: React.MouseEvent<HTMLLIElement>): void
  children: ReactNode
}

export interface ISTab extends IStyledTheme {
  $isActive: boolean
}
