export * from './bible'
export * from './module'

export type TAny = any

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
