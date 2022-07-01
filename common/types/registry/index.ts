export interface IRegistry {
  version: number
  hosts: IRegistryHost[]
  downloads: IRegistryDownload[]
}

export interface IRegistryDownloadLds {
  /** language */
  lng: string
  /** description */
  des: string
}

export interface IRegistryHost {
  /** host URL with %s */
  path: string
  /** host alias */
  alias: string
  /** host priority */
  priority: number
  /** host weight */
  weight: number
}

export interface IRegistryDownload {
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

export interface IRegistryDownloadJson {
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
  version: number
  hosts: IRegistryHost[]
  downloads: IRegistryDownloadJson[]
}

export interface IRegistryInfoJson {
  version: number
}
