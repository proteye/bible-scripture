import { TLanguagesISO6392, TPreparedRegistryModules } from 'types/common'
import { capitalizeString } from './capitalizeString'

export const prepareModulesStructure = (
  modulesStructure: TPreparedRegistryModules,
  languagesISO6392?: TLanguagesISO6392,
) =>
  Object.keys(modulesStructure).map((type) => ({
    type,
    label: capitalizeString(type),
    languages: Object.keys(modulesStructure[type])
      .map((lang) => {
        const langIso = languagesISO6392?.[lang]
        const label = capitalizeString(langIso ? langIso.native[0] : lang)
        const intl = langIso ? langIso.int[0] : lang

        return {
          lang,
          intl,
          label,
        }
      })
      .sort((a, b) => (/^[^a-z]/gi.test(a.intl) ? 1 : /^[^a-z]/gi.test(b.intl) ? -1 : a.intl?.localeCompare(b.intl))),
  }))
