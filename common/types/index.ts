export * from './module'
export * from './registry'
export * from './bible'
export * from './dictionary'

export type TAny = any

export type TId = string

export type TUid = string

export type TChannelName =
  | 'getRegistry'
  | 'getModules'
  | 'openModule'
  | 'downloadModule'
  | 'closeModuleByUid'
  | 'closeModule'
  | 'openBible'
  | 'closeBibleByUid'
  | 'getBibleInfo'
  | 'getBibleBooks'
  | 'getBibleVerses'
