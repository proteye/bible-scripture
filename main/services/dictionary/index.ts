import { readdirSync, statSync } from 'fs'
import {
  IDictionaryDictionary,
  IDictionaryInfo,
  TUid,
  TModuleName,
  IDictionaryMorphologyIndications,
} from 'common/types'
import { IDictionaryByName, IDictionaryByUid, IGetDictionaryTopicProps, IGetMorphologyIndicationProps } from './types'
import { editOrCreateDb, closeDb } from '../../database'
import { module } from '../index'
import moduleConfig from '../../config/moduleConfig'

const DICT_LOOKUP_DB = moduleConfig.internalDb.dictionariesLookup
const dictionarySuffix = '.dictionary'

const dictionaryByUid: IDictionaryByUid = {}
const dictionaryByName: IDictionaryByName = {}

const openDictionary = (moduleName: TModuleName, uid: TUid) => {
  const _moduleName = moduleName + dictionarySuffix
  dictionaryByUid[uid] = _moduleName

  if (!dictionaryByName[_moduleName]) {
    dictionaryByName[_moduleName] = []
  }

  dictionaryByName[_moduleName].push(uid)

  return module.openModule(_moduleName, uid)
}

const closeDictionaryByUid = (uid: TUid) => {
  const moduleName = dictionaryByUid[uid]

  if (!moduleName) {
    return false
  }

  const index = dictionaryByName[moduleName].indexOf(uid)

  if (index !== -1) {
    dictionaryByName[moduleName].splice(index, 1)
  }

  if (dictionaryByName[moduleName].length === 0) {
    delete dictionaryByName[moduleName]
  }

  delete dictionaryByUid[uid]

  module.closeModuleByUid(moduleName, uid)

  return module.closeModuleByUid(moduleName, uid)
}

const getDictionaryInfo = (uid: TUid) => {
  return new Promise((resolve) => {
    const moduleName = dictionaryByUid[uid]
    const dictionary = module.openModule(moduleName, uid)

    dictionary.all('SELECT name, value FROM info', (_: any, info: IDictionaryInfo[]) => {
      resolve(info || [])
    })
  })
}

const getDictionaryByTopic = (uid: TUid, { topic }: IGetDictionaryTopicProps) => {
  return new Promise((resolve) => {
    const moduleName = dictionaryByUid[uid]
    const dictionary = module.openModule(moduleName, uid)

    dictionary.get(
      'SELECT topic, definition, short_definition AS shortDefinition, lexeme, transliteration, pronunciation FROM dictionary WHERE topic=?',
      [topic],
      (_: any, item: IDictionaryDictionary) => {
        resolve(item || null)
      },
    )
  })
}

const getMorphologyIndication = (uid: TUid, { indication }: IGetMorphologyIndicationProps) => {
  return new Promise((resolve) => {
    const moduleName = dictionaryByUid[uid]
    const dictionary = module.openModule(moduleName, uid)
    let indicationValue = [indication]
    const splittedIndication = indication.split('-')
    if (splittedIndication.length) {
      indicationValue =
        splittedIndication.length > 2
          ? [splittedIndication[0], `-${splittedIndication[1]}`, `-${splittedIndication[2]}`]
          : [indication, splittedIndication[0], `-${splittedIndication[1]}`]
    }

    dictionary.all(
      'SELECT indication, applicable_to AS applicableTo, meaning FROM morphology_indications WHERE indication IN (?,?,?)',
      indicationValue,
      (_: any, item: IDictionaryMorphologyIndications[]) => {
        resolve(item ? item.reverse() : [])
      },
    )
  })
}

const syncDictionaries = async (): Promise<void> => {
  try {
    const files = readdirSync(moduleConfig.path)

    const dictionaries = files
      .filter((file) => file.includes(moduleConfig.extension) && file.includes(dictionarySuffix))
      .map((file) => {
        const splittedFile = file.split('.')
        const name = splittedFile[0]
        const fileStats = statSync(`${moduleConfig.path}/${file}`)

        return {
          name,
          type: '',
          language: '',
          matchingType: '',
          dictionaryRows: 0,
          wordsRows: 0,
          lastModified: fileStats.mtime,
          isChanged: false,
          isIndexedSuccessfully: false,
        }
      })

    const db = editOrCreateDb(DICT_LOOKUP_DB)

    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS dictionaries (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, type TEXT NOT NULL, language TEXT NOT NULL, matching_type INTEGER NOT NULL, dictionary_rows INTEGER NOT NULL, words_rows INTEGER NOT NULL, last_modified TIMESTAMP NOT NULL, is_changed INTEGER NOT NULL, is_indexed_successfully INTEGER NOT NULL, created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL)',
      )

      const stmt = db.prepare(
        'INSERT OR REPLACE INTO dictionaries(name, type, language, matching_type, dictionary_rows, words_rows, last_modified, is_changed, is_indexed_successfully) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      )
      dictionaries.forEach(
        ({
          name,
          type,
          language,
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
            language,
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

    closeDb(DICT_LOOKUP_DB)
  } catch (err) {
    console.error(err)
  }
}

export default {
  openDictionary,
  closeDictionaryByUid,
  getDictionaryInfo,
  getDictionaryByTopic,
  getMorphologyIndication,
  syncDictionaries,
}
