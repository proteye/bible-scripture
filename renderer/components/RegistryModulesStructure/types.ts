import { IComponentDefaultProps } from 'components/types'
import { TLanguagesISO6392, TPreparedRegistryModules } from 'types/common'
import { IRegistryModulesTableProps } from '../RegistryModulesTable/types'

export interface IRegistryModulesStructureProps extends Partial<IRegistryModulesTableProps>, IComponentDefaultProps {
  modulesStructure: TPreparedRegistryModules
  languagesISO6392?: TLanguagesISO6392
}
