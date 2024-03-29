import { statSync, readdirSync, unlinkSync } from 'fs'
import { readdir } from 'fs/promises'
import {
  TUid,
  TModuleName,
  TModulesList,
  TModuleType,
  IRegistryHost,
  TAny,
  IModuleInfo,
  IDownloadProgress,
  TDownloadProgressCallback,
} from 'common/types'
import { editOrCreateDb, openDb, closeDb } from '../../database'
import { IModules } from './types'
import moduleConfig from '../../config/moduleConfig'
import registry from '../registry'
import { download, unzip } from '../../helpers'
import { TDownloadResult } from '../../types'

const MODULES_DB = 'modules'
const modules: IModules = {}

const getModules = (): Promise<TModulesList> => {
  const db = openDb(MODULES_DB)

  return new Promise((resolve) => {
    db.all(
      'SELECT id, type, short_name AS shortName, long_name AS longName, description, filename, size FROM modules',
      (err: any, modules: TModulesList) => {
        if (err) {
          db.all(
            'SELECT id, type, short_name AS shortName, long_name AS longName, description, filename, size FROM modules',
            (_err: any, modules: TModulesList) => {
              resolve(modules || [])
            },
          )
          return
        }

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
        const fileStats = statSync(`${moduleConfig.path}/${file}`)

        return {
          id,
          type,
          shortName: id,
          longName: '',
          description: '',
          filename: file,
          size: fileStats.size,
        }
      })

    const db = editOrCreateDb(MODULES_DB)

    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS modules (id TEXT, type TEXT, short_name TEXT, long_name TEXT, description TEXT, filename TEXT, size INTEGER, created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (id, type))',
      )
      const stmt = db.prepare(
        'INSERT OR REPLACE INTO modules(id, type, short_name, long_name, description, filename, size) VALUES (?, ?, ?, ?, ?, ?, ?)',
      )
      modules.forEach(({ id, type, shortName, longName, description, filename, size }) => {
        stmt.run(id, type, shortName, longName, description, filename, size)
      })
      stmt.finalize()
    })

    closeDb(MODULES_DB)

    return modules
  } catch (err) {
    console.error(err)
  }
}

const getDownloadUrls = (moduleName: TModuleName) => {
  const { hosts, downloads } = registry.getRegistry()
  const downloadInfo = downloads.find(({ abr }) => abr === moduleName)

  if (!downloadInfo) {
    return []
  }

  const hostsMap = hosts.reduce((prev, curr) => ({ ...prev, [curr.alias]: curr }), {})

  return downloadInfo.url
    .map((url) => {
      const [, alias, filename] = url.match(/{(.+?)}(.+)/i)
      const host = hostsMap[alias]

      return { ...host, path: host.path.replace('%s', filename) } as IRegistryHost
    })
    .sort((a, b) => a.priority - b.priority)
}

const downloadModule = async (moduleName: TModuleName, onProgress?: TDownloadProgressCallback) =>
  new Promise<IModuleInfo[] | null>(async (resolve) => {
    try {
      const downloadUrls = getDownloadUrls(moduleName)

      if (!downloadUrls.length) {
        return resolve(null)
      }

      let index = 0
      let result: TDownloadResult = false
      let dest = ''
      let filename = ''

      while (!result && index < downloadUrls.length) {
        const url = downloadUrls[index].path
        filename = decodeURIComponent(url.split('/').pop())
        dest = `${moduleConfig.path}/${filename}`
        result = await download(downloadUrls[index].path, dest, onProgress)
        index += 1
      }

      if (!result) {
        return resolve(null)
      }

      const files = await unzip(dest, moduleConfig.path, true)
      unlinkSync(dest)

      if (typeof files === 'string') {
        return resolve(null)
      }

      const modules = (files as string[])
        .filter((file) => file.includes(moduleConfig.extension))
        .map((filename) => {
          const splittedFile = filename.split('.')
          const id = splittedFile[0]
          const type = splittedFile.length > 2 ? (splittedFile[1] as TModuleType) : 'bible'
          const fileStats = statSync(`${moduleConfig.path}/${filename}`)

          return {
            id,
            type,
            shortName: id,
            longName: '',
            description: '',
            filename,
            size: fileStats.size,
          }
        })

      const db = editOrCreateDb(MODULES_DB)

      db.serialize(() => {
        const stmt = db.prepare(
          'INSERT OR REPLACE INTO modules(id, type, short_name, long_name, description, filename, size) VALUES (?, ?, ?, ?, ?, ?, ?)',
        )
        modules.forEach(({ id, type, shortName, longName, description, filename, size }) => {
          stmt.run(id, type, shortName, longName, description, filename, size)
        })
        stmt.finalize()
      })

      closeDb(MODULES_DB)

      return resolve(modules)
    } catch (err) {
      console.error(err)
    }

    resolve(null)
  })

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

const removeModule = async (moduleName: TModuleName) =>
  new Promise(async (resolve, reject) => {
    try {
      closeModule(moduleName)

      readdirSync(moduleConfig.path)
        .filter((file) => file.startsWith(`${moduleName}.`))
        .map((file) => unlinkSync(`${moduleConfig.path}/${file}`))

      const db = editOrCreateDb(MODULES_DB)
      db.run('DELETE FROM modules WHERE id=?', [moduleName], (err: TAny) => {
        if (err) {
          throw err
        }

        resolve(true)
      })
    } catch (err) {
      console.error(err)
      reject(err.message)
    }
  })

export default { getModules, downloadModule, syncModules, openModule, closeModuleByUid, closeModule, removeModule }
