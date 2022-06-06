import { ReactNode } from 'react'
import { IComponentDefaultProps } from 'components/types'

export interface IContentByLangProps extends IComponentDefaultProps {
  lang?: string
  children?: ReactNode
}
