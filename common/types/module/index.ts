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
  size: number
}

export interface IDownloadProgress {
  /** Total size in bytes */
  total: number
  /** Downloaded size in bytes */
  downloaded: number
}

export type TDownloadProgressCallback = (progress: IDownloadProgress) => void

export type TModuleType =
  | 'bible'
  | 'dictionary'
  | 'subheadings'
  | 'crossreferences'
  | 'commentaries'
  | 'plan'
  | 'devotions'
  | 'bundle'
