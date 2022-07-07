import { IRegistryDownload, TModulesList } from '@common/types'
import { IComponentDefaultProps } from 'components/types'

export interface IRegistryModulesTableProps extends IComponentDefaultProps {
  modules: IRegistryDownload[]
  downloadedModules?: TModulesList
  theadClassName?: string
  onDownload?(moduleName: string): void
}

export interface IPreparedRegistryDownload extends IRegistryDownload {
  // Is already downloaded?
  exists?: boolean
}

export type TSelectedState = {
  [moduleName: string]: boolean
}
