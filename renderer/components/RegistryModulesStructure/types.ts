import { IComponentDefaultProps } from 'components/types'
import { TPreparedRegistryModules } from 'types/common'
import { IRegistryModulesTableProps } from '../RegistryModulesTable/types'

export interface IRegistryModulesStructureProps extends Partial<IRegistryModulesTableProps>, IComponentDefaultProps {
  modulesStructure: TPreparedRegistryModules
}
