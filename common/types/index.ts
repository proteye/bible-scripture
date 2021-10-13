export * from './bible'

export type TAny = any

export type TModuleName = string

export type TId = string

export type TChannelName =
  | 'openModule'
  | 'closeModuleByUid'
  | 'closeModule'
  | 'openBible'
  | 'closeBibleByUid'
  | 'getBibleInfo'
  | 'getBibleBooks'
  | 'getBibleVerses'
