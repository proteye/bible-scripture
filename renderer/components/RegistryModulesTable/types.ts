import { IRegistryDownload, TModulesList } from '@common/types'
import { IComponentDefaultProps } from 'components/types'

export interface IRegistryModulesTableProps extends IComponentDefaultProps {
  modules: IRegistryDownload[]
  downloadedModules?: TModulesList
  selectedModules?: TSelectedModules
  theadClassName?: string
  onSelect?(moduleName: string): void
  onDownload?(moduleName: string): void
  onRemove?(moduleName: string): void
}

export interface IPreparedRegistryDownload extends IRegistryDownload {
  // Is already downloaded?
  exists?: boolean
}

export type TSelectedModules = {
  [moduleName: string]: boolean
}
