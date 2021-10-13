import { TModuleName } from 'common/types'

export interface IModuleInfo {
  listenersCount: number
}

export interface IModules {
  [moduleName: TModuleName]: IModuleInfo
}
