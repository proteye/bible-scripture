import { readdir } from 'fs/promises'
import { TUid, TModuleName, TModulesList, TModuleType } from 'common/types'
import { editOrCreateDb, openDb, closeDb } from '../../database'
import { IModules } from './types'
import moduleConfig from '../../config/moduleConfig'

const MODULES_CONFIG_DB = 'modules.config'
const modules: IModules = {}

const getModules = async (): Promise<TModulesList> => {
  try {
    const files = await readdir(moduleConfig.path)

    const modules = files
      .filter((file) => !file.includes(MODULES_CONFIG_DB))
      .map((file) => {
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

    const db = editOrCreateDb(MODULES_CONFIG_DB)
    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS modules (id TEXT, short_name TEXT, long_name TEXT, type TEXT, description TEXT, filename TEXT)',
      )
      const stmt = db.prepare('INSERT OR REPLACE INTO modules VALUES (?, ?, ?, ?, ?, ?)')
      modules.forEach(({ id, shortName, longName, type, description, filename }) => {
        stmt.run(id, shortName, longName, type, description, filename)
      })
      stmt.finalize()

      db.each('SELECT rowid AS id, short_name AS shortName FROM modules', function (_, row) {
        console.log(row.id + ': ' + row.shortName)
      })
    })
    db.close()

    return modules
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
