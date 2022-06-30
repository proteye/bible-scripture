import { IRegistryHost, IRegistryDownload } from 'common/types'

export interface IRegistry {
  hosts: IRegistryHost[],
  downloads: IRegistryDownload[]
}
