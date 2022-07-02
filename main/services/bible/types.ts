import { TId, TModuleName } from 'common/types'

export interface IBibleByUid {
  [uid: TId]: TModuleName
}

export interface IBibleByName {
  [moduleName: TModuleName]: TId[]
}

export interface IGetBibleVersesProps {
  bookNumber: number
  chapter: number
}
