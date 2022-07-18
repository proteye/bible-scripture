import { readdirSync, statSync } from 'fs'
import {
  IDictionaryDictionary,
  IDictionaryInfo,
  TUid,
  TModuleName,
  IDictionaryMorphologyIndication,
} from 'common/types'
import { IDictionaryByName, IDictionaryByUid, IGetDictionaryTopicProps, IGetMorphologyIndicationProps } from './types'
import { editOrCreateDb, closeDb } from '../../database'
import { module } from '../index'
import moduleConfig from '../../config/moduleConfig'
import dbQueries from '../../constants/dbQueries'
import databases from '../../constants/databases'
import suffixes from '../../constants/suffixes'

const DICT_LOOKUP_DB = databases.dictionariesLookup

const dictionaryByUid: IDictionaryByUid = {}
const dictionaryByName: IDictionaryByName = {}

const openDictionary = (moduleName: TModuleName, uid: TUid) => {
  const _moduleName = moduleName + suffixes.dictionary
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
      (_: any, item: IDictionaryMorphologyIndication[]) => {
        resolve(item ? item.reverse() : [])
      },
    )
  })
}

const syncDictionaries = async (): Promise<void> => {
  try {
    const files = readdirSync(moduleConfig.path)

    const dictionaries = files
      .filter((file) => file.includes(moduleConfig.extension) && file.includes(suffixes.dictionary))
      .map((file) => {
        const splittedFile = file.split('.')
        const name = splittedFile[0]
        const fileStats = statSync(`${moduleConfig.path}/${file}`)

        return {
          name,
          type: '',
          lang: '',
          description: '',
          matchingType: 1,
          dictionaryRows: 0,
          wordsRows: 0,
          lastModified: fileStats.mtime,
          isChanged: 1,
          isIndexedSuccessfully: 0,
        }
      })

    const db = editOrCreateDb(DICT_LOOKUP_DB)

    db.serialize(() => {
      db.run(dbQueries.dictionariesLookup.dictionaries.create)
      const stmt = db.prepare(dbQueries.dictionariesLookup.dictionaries.insert)
      dictionaries.forEach(
        ({
          name,
          type,
          lang,
          description,
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
            description,
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
