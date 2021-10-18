export type TModuleId = string

export type TModuleName = string

export type TModules = IModuleInfo[]

export interface IModuleInfo {
  id: TModuleId
  name: TModuleName
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
