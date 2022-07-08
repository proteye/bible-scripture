import { IRegistryDownload, TModulesList } from '@common/types'
import { IComponentDefaultProps } from 'components/types'

export interface IRegistryModulesTableProps extends IComponentDefaultProps {
  type: string
  lang: string
  modules: IRegistryDownload[]
  downloadedModules?: TModulesList
  selectedModules?: TSelectedModules
  theadClassName?: string
  onSelect?(moduleName: string): void
  onSelectAll?(type: string, lang: string, isSelected: boolean): void
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
