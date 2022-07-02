import { IRegistryDownload } from '@common/types'

export type TPreparedRegistryModules = {
  [key in EModuleType]: { [lng: string]: IRegistryDownload[] }
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
