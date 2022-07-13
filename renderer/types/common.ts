import { IRegistryDownload } from '@common/types'

export type TPreparedRegistryModules = {
  [key in EModuleType]: { [lng: string]: IRegistryDownload[] }
}

export type TLanguagesISO6392 = {
  [lang: string]: { int: string[]; native: string[] }
}

export enum EModuleType {
  bible = 'bible',
  dictionary = 'dictionary',
  subheadings = 'subheadings',
  crossreferences = 'crossreferences',
  commentaries = 'commentaries',
  plan = 'plan',
  devotions = 'devotions',
  bundle = 'bundle',
}
