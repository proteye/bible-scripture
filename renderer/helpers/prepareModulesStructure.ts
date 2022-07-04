import { TPreparedRegistryModules } from 'types/common'
import { capitalizeString } from './capitalizeString'

export const prepareModulesStructure = (modulesStructure: TPreparedRegistryModules) =>
  Object.keys(modulesStructure).map((type) => ({
    type,
    label: capitalizeString(type),
    isOpen: false,
    languages: Object.keys(modulesStructure[type]).map((lang) => ({
      lang,
      label: capitalizeString(lang),
      isOpen: false,
    })),
  }))
