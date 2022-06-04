import { TId, TModuleName } from 'common/types'

export interface IModules {
  [moduleName: TModuleName]: TId[]
}
