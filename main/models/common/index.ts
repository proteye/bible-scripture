import { TModuleName } from 'common/types'
import { openDb, closeDb } from '../../database'
import { IModules } from './types'

const modules: IModules = {}

const openModule = (moduleName: TModuleName) => {
  if (!modules[moduleName]) {
    modules[moduleName] = { listenersCount: 0 }
  }

  modules[moduleName].listenersCount += 1

  return openDb(moduleName)
}

const closeModule = (moduleName: TModuleName, closeAll = false) => {
  if (!closeAll && modules[moduleName].listenersCount > 1) {
    modules[moduleName].listenersCount -= 1

    return true
  }

  delete modules[moduleName]

  return closeDb(moduleName)
}

export default { openModule, closeModule }
