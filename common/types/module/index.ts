export type TModuleName = string

export type TModulesList = IModuleInfo[]

export interface IModuleInfo {
  name: TModuleName
  type: TModuleType
  lang: string
  description: string
  filename: string
  lastModified: Date
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
