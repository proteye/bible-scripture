import { module } from '../index'
import {
  IDictionaryDictionary,
  IDictionaryInfo,
  TUid,
  TModuleName,
  IDictionaryMorphologyIndications,
} from 'common/types'
import { IDictionaryByName, IDictionaryByUid, IGetDictionaryTopicProps, IGetMorphologyIndicationProps } from './types'

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
      indicationValue = splittedIndication.length > 2 ? [splittedIndication[0], `-${splittedIndication[1]}`, `-${splittedIndication[2]}`] : [indication, splittedIndication[0], `-${splittedIndication[1]}`]
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

export default {
  openDictionary,
  closeDictionaryByUid,
  getDictionaryInfo,
  getDictionaryByTopic,
  getMorphologyIndication,
}
