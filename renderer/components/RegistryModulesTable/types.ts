import { IRegistryDownload } from '@common/types'
import { IComponentDefaultProps } from 'components/types'

export interface IRegistryModulesTableProps extends IComponentDefaultProps {
  modules: IRegistryDownload[]
  theadClassName?: string
  onDownload?(moduleName: string): void
}
