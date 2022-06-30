import { IRegistryHost, IRegistryDownloadInfo } from 'common/types'

export interface IRegistry {
  hosts: IRegistryHost[],
  downloads: IRegistryDownloadInfo[]
}
