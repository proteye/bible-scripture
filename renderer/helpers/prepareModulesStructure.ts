import { TLanguagesISO639, TPreparedRegistryModules } from 'types/common'
import { capitalizeString } from './capitalizeString'

export const prepareModulesStructure = (modulesStructure: TPreparedRegistryModules, languagesISO?: TLanguagesISO639) =>
  Object.keys(modulesStructure).map((type) => ({
    type,
    label: capitalizeString(type),
    isOpen: false,
    languages: Object.keys(modulesStructure[type]).map((lang) => ({
      lang,
      label: capitalizeString(languagesISO?.[lang]?.native[0] ?? lang),
      isOpen: false,
    })),
  }))
