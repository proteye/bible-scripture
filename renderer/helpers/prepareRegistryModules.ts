import { IRegistryDownload } from '@common/types'
import { EModuleType, TPreparedRegistryModules } from 'types/common'

export const prepareRegistryModules = (downloads: IRegistryDownload[]): TPreparedRegistryModules => {
  const moduleTypeKeys = Object.keys(EModuleType)

  const result = moduleTypeKeys.reduce((prev, curr) => ({ ...prev, [curr]: {} }), {} as TPreparedRegistryModules)

  downloads
    .sort((a, b) => (/[^a-z]/i.test(a.lng) ? 1 : /[^a-z]/i.test(b.lng) ? -1 : a.lng?.localeCompare(b.lng)))
    .forEach((item) => {
      const { fil, lng } = item
      const splittedFil = fil.split('.')
      const lastFilPart = splittedFil?.[splittedFil.length - 1]
      const type = moduleTypeKeys.includes(lastFilPart) ? (lastFilPart as EModuleType) : EModuleType.bible
      const lang = lng ?? 'all'

      if (!result[type][lang]) {
        result[type][lang] = []
      }
      result[type][lang].push(item)
    })

  return result
}
