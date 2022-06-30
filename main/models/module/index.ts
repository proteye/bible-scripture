import { readdir } from 'fs/promises'
import { TUid, TModuleName, TModulesList, TModuleType } from 'common/types'
import { editOrCreateDb, openDb, closeDb } from '../../database'
import { IModules } from './types'
import moduleConfig from '../../config/moduleConfig'

const MODULES_DB = 'modules'
const modules: IModules = {}

const getModules = (): Promise<TModulesList> => {
  const db = openDb(MODULES_DB)

  return new Promise((resolve) => {
    db.all(
      'SELECT id, type, short_name AS shortName, long_name AS longName, description, filename FROM modules',
      (e: any, modules: TModulesList) => {
        resolve(modules || [])
      },
    )

    closeDb(MODULES_DB)
  })
}

const syncModules = async (): Promise<TModulesList> => {
  try {
    const files = await readdir(moduleConfig.path)

    const modules = files
      .filter((file) => file.includes(moduleConfig.extension) && !file.includes(MODULES_DB))
      .map((file) => {
        const splittedFile = file.split('.')
        const id = splittedFile[0]
        const type = splittedFile.length > 2 ? (splittedFile[1] as TModuleType) : 'bible'

        return {
          id,
          type,
          shortName: id,
          longName: '',
          description: '',
          filename: file,
        }
      })

    const db = editOrCreateDb(MODULES_DB)

    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS modules (id TEXT, type TEXT, short_name TEXT, long_name TEXT, description TEXT, filename TEXT, created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (id, type))',
      )
      const stmt = db.prepare(
        'INSERT OR REPLACE INTO modules(id, type, short_name, long_name, description, filename) VALUES (?, ?, ?, ?, ?, ?)',
      )
      modules.forEach(({ id, type, shortName, longName, description, filename }) => {
        stmt.run(id, type, shortName, longName, description, filename)
      })
      stmt.finalize()
    })

    closeDb(MODULES_DB)

    return modules
  } catch (err) {
    console.error(err)
  }
}

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
