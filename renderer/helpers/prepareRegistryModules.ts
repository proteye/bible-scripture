import { IRegistryDownload } from '@common/types'
import { EModuleType, TPreparedRegistryModules } from 'types/common'

export const prepareRegistryModules = (downloads: IRegistryDownload[]): TPreparedRegistryModules => {
  const moduleTypeKeys = Object.keys(EModuleType)

  const result = moduleTypeKeys.reduce((prev, curr) => ({ ...prev, [curr]: {} }), {} as TPreparedRegistryModules)

  downloads.forEach((item) => {
    const { fil, lng } = item
    const splittedFil = fil.split('.')
    const lastFilPart = splittedFil?.[splittedFil.length - 1]
    const type = moduleTypeKeys.includes(lastFilPart) ? (lastFilPart as EModuleType) : EModuleType.bible

    if (!result[type][lng]) {
      result[type][lng] = []
    }
    result[type][lng].push(item)
  })

  return result
}
