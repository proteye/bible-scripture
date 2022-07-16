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
  TDownloadProgressCallback,
} from 'common/types'
import { editOrCreateDb, openDb, closeDb } from '../../database'
import { IModules } from './types'
import moduleConfig from '../../config/moduleConfig'
import registry from '../registry'
import { download, unzip } from '../../helpers'
import { TDownloadResult } from '../../types'
import dbQueries from '../../constants/dbQueries'
import databases from '../../constants/databases'
import suffixes from '../../constants/suffixes'

const MODULES_DB = databases.modules
const modules: IModules = {}

const getModules = (): Promise<TModulesList> => {
  const db = openDb(MODULES_DB)

  return new Promise((resolve) => {
    db.all(
      'SELECT name, type, lang, description, filename, last_modified AS lastModified, size FROM modules',
      (err: any, modules: TModulesList) => {
        if (err) {
          db.all(
            'SELECT name, type, lang, description, filename, last_modified AS lastModified, size FROM modules',
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
      .filter(
        (file) =>
          file.includes(moduleConfig.extension) &&
          !file.includes(MODULES_DB) &&
          !file.includes(databases.dictionariesLookup),
      )
      .map((file) => {
        const splittedFile = file.split('.')
        const name = splittedFile[0]
        const type = splittedFile.length > 2 ? (splittedFile[1] as TModuleType) : 'bible'
        const fileStats = statSync(`${moduleConfig.path}/${file}`)

        return {
          name,
          type,
          lang: '',
          description: '',
          filename: file,
          lastModified: fileStats.mtime,
          size: fileStats.size,
        }
      })

    const db = editOrCreateDb(MODULES_DB)

    db.serialize(() => {
      db.run(dbQueries.modules.modules.create)
      const stmt = db.prepare(dbQueries.modules.modules.insert)
      modules.forEach(({ name, type, lang, description, filename, lastModified, size }) => {
        stmt.run(name, type, lang, description, filename, lastModified, size)
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
          const name = splittedFile[0]
          const type = splittedFile.length > 2 ? (splittedFile[1] as TModuleType) : 'bible'
          const fileStats = statSync(`${moduleConfig.path}/${filename}`)

          return {
            name,
            type,
            lang: '',
            description: '',
            filename,
            lastModified: fileStats.mtime,
            size: fileStats.size,
          }
        })
      const dictionaries = modules
        .filter(({ type }) => type === 'dictionary')
        .map(({ name, lang, lastModified }) => ({
          name,
          type: '',
          lang,
          matchingType: 1,
          dictionaryRows: 0,
          wordsRows: 0,
          lastModified,
          isChanged: 1,
          isIndexedSuccessfully: 0,
        }))

      const db = editOrCreateDb(MODULES_DB)
      db.serialize(() => {
        const stmt = db.prepare(dbQueries.modules.modules.insert)
        modules.forEach(({ name, type, lang, description, filename, lastModified, size }) => {
          stmt.run(name, type, lang, description, filename, lastModified, size)
        })
        stmt.finalize()
      })
      closeDb(MODULES_DB)

      if (dictionaries.length > 0) {
        const db = editOrCreateDb(databases.dictionariesLookup)
        db.serialize(() => {
          const stmt = db.prepare(dbQueries.dictionariesLookup.dictionaries.insert)
          dictionaries.forEach(
            ({
              name,
              type,
              lang,
              matchingType,
              dictionaryRows,
              wordsRows,
              lastModified,
              isChanged,
              isIndexedSuccessfully,
            }) => {
              stmt.run(
                name,
                type,
                lang,
                matchingType,
                dictionaryRows,
                wordsRows,
                lastModified,
                isChanged,
                isIndexedSuccessfully,
              )
            },
          )
          stmt.finalize()
        })
        closeDb(databases.dictionariesLookup)
      }

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

      const files = readdirSync(moduleConfig.path).filter((file) => file.startsWith(`${moduleName}.`))
      const dictionaries = files.filter((file) => file.includes(suffixes.dictionary))

      files.map((file) => unlinkSync(`${moduleConfig.path}/${file}`))

      const db = editOrCreateDb(MODULES_DB)
      db.run('DELETE FROM modules WHERE name=?', [moduleName], (err: TAny) => {
        if (err) {
          throw err
        }

        if (!dictionaries.length) {
          resolve(true)
        }
      })
      closeDb(MODULES_DB)

      if (dictionaries.length > 0) {
        const db = editOrCreateDb(databases.dictionariesLookup)
        db.run('DELETE FROM dictionaries WHERE name=?', [moduleName], (err: TAny) => {
          if (err) {
            throw err
          }

          resolve(true)
        })
        closeDb(databases.dictionariesLookup)
      }
    } catch (err) {
      console.error(err)
      reject(err.message)
    }
  })

export default { getModules, downloadModule, syncModules, openModule, closeModuleByUid, closeModule, removeModule }
