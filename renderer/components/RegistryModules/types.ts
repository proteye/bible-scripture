import { IComponentDefaultProps } from 'components/types'
import { TPreparedRegistryModules } from 'types/common'

export interface IRegistryModulesProps extends IComponentDefaultProps {
  modules: TPreparedRegistryModules
  onItemClick?(moduleName: string): void
}
