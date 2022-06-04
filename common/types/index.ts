export * from './module'
export * from './bible'
export * from './dictionary'

export type TAny = any

export type TId = string

export type TUid = string

export type TChannelName =
  | 'openModule'
  | 'closeModuleByUid'
  | 'closeModule'
  | 'openBible'
  | 'closeBibleByUid'
  | 'getBibleInfo'
  | 'getBibleBooks'
  | 'getBibleVerses'
