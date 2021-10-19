import { readdir } from 'fs/promises'
import { TUid, TModuleName, TModulesList, TModuleType } from 'common/types'
import { openDb, closeDb } from '../../database'
import { IModules } from './types'
import moduleConfig from '../../config/moduleConfig'

const modules: IModules = {}

const getModules = async (): Promise<TModulesList> => {
  try {
    const files = await readdir(moduleConfig.path)

    return files.map((file) => {
      const splittedFile = file.split('.')
      const id = splittedFile[0]
      const type = splittedFile.length > 2 ? (splittedFile[1] as TModuleType) : 'bible'

      return {
        id,
        shortName: id,
        longName: '',
        type,
        description: '',
        filename: file,
      }
    })
  } catch (err) {
    console.error(err)
  }
}

const syncModules = () => {}

const openModule = (moduleName: TModuleName, uniqId?: TUid) => {
  if (!modules[moduleName]) {
    modules[moduleName] = []
  }

  if (uniqId && modules[moduleName].indexOf(uniqId) === -1) {
    modules[moduleName].push(uniqId)
  }

  return openDb(moduleName)
}

const closeModuleByUid = (moduleName: TModuleName, uniqId: TUid) => {
  if (!modules[moduleName]) {
    return false
  }

  const index = modules[moduleName].indexOf(uniqId)

  if (index !== -1 && modules[moduleName].length > 1) {
    modules[moduleName].splice(index, 1)

    return true
  }

  delete modules[moduleName]

  return closeDb(moduleName)
}

const closeModule = (moduleName: TModuleName) => {
  delete modules[moduleName]

  return closeDb(moduleName)
}

export default { getModules, syncModules, openModule, closeModuleByUid, closeModule }
