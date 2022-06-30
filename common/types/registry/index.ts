export type TRegistryId = number

export type TRegistryName = string

export type IRegistryDownloadJsonList = IRegistryDownloadJson[]

export interface IRegistryDownloadLds {
  /** language */
  lng: string
  /** description */
  des: string
}

export interface IRegistryDownloadInfo {
  /** ID */
  id?: TRegistryId
  /** abbreviation */
  abr: string
  /** language */
  lng: string
  /** articles language */
  aln: string
  /** region */
  reg: string
  /** description */
  des: string
  /** description in other languages */
  lds: IRegistryDownloadLds[]
  /** detailed info */
  inf: string
  /** file name */
  fil: string
  /** update date */
  upd: string
  /** update comments */
  cmt: string
  /** indication of default downloadable */
  def: boolean
  /** list of downloadables */
  url: string[]
  /** download size */
  siz: string
  /** list of relative paths of files within this downloadable */
  lst: string[]
  /** list of dependencies */
  dep: string[]
  /** indication of a hidden module */
  hid: boolean
  /** license */
  lic: string
}

export interface IRegistryHost {
  path: string
  alias: string
  priority: number
  weight: number
}

export interface IRegistryDownloadJson {
  id?: TRegistryId
  abr: string
  lng: string
  aln: string
  reg: string
  des: string
  lds: IRegistryDownloadLds[]
  inf: string
  fil: string
  upd: string
  cmt: string
  def: boolean
  url: string[]
  siz: string
  lst: string
  dep: string
  hid: boolean
  lic: string
}

export interface IRegistryJson {
  hosts: IRegistryHost[]
  downloads: IRegistryDownloadJson[]
}
