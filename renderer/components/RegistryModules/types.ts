import { IComponentDefaultProps } from 'components/types'
import { IRegistryDownload } from '@common/types'

export interface IRegistryModulesProps extends IComponentDefaultProps {
  downloads: IRegistryDownload[]
  onItemClick?(moduleName: string): void
}