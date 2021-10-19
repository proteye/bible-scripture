export type TModuleId = string

export type TModuleName = string

export type TModulesList = IModuleInfo[]

export interface IModuleInfo {
  id: TModuleId
  shortName: string
  longName: string
  type: TModuleType
  description: string
  filename: string
}

export type TModuleType =
  | 'bible'
  | 'dictionary'
  | 'subheadings'
  | 'crossreferences'
  | 'commentaries'
  | 'plan'
  | 'devotions'
  | 'bundle'
