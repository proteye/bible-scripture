import { IComponentDefaultProps } from 'components/types'
import { EModuleType, TLanguagesISO6392, TPreparedRegistryModules } from 'types/common'
import { IRegistryModulesTableProps } from '../RegistryModulesTable/types'

export interface IRegistryModulesStructureProps extends Partial<IRegistryModulesTableProps>, IComponentDefaultProps {
  modulesStructure: TPreparedRegistryModules
  languagesISO6392?: TLanguagesISO6392
}

export type TModuleLangOpen = {
  [lng: string]: { isOpen: boolean }
}

export type TModuleTypeOpen = {
  [key in EModuleType]: { isOpen: boolean; languages: TModuleLangOpen }
}
