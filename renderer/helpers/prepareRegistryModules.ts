import { IRegistryDownload } from '@common/types'
import { EModuleType, TPreparedRegistryModules } from 'types/common'
import { getModuleType } from './getModuleType'

export const prepareRegistryModules = (downloads: IRegistryDownload[]): TPreparedRegistryModules => {
  const moduleTypeKeys = Object.keys(EModuleType)
  const result = moduleTypeKeys.reduce((prev, curr) => ({ ...prev, [curr]: {} }), {} as TPreparedRegistryModules)

  downloads.forEach((item) => {
    const { fil, lng } = item
    const type = getModuleType(fil)
    const lang = lng ?? 'all'

    if (!result[type][lang]) {
      result[type][lang] = []
    }
    result[type][lang].push(item)
  })

  return result
}
