import { TId, TModuleName } from 'common/types'

export interface IDictionaryByUid {
  [uid: TId]: TModuleName
}

export interface IDictionaryByName {
  [moduleName: TModuleName]: TId[]
}

export interface IGetDictionaryTopicProps {
  topic: string
}
