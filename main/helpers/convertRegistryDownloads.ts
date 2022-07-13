import { IRegistryDownload, IRegistryDownloadJson } from 'common/types'

const convertRegistryDownloads = (downloads: IRegistryDownloadJson[]) =>
  downloads.map(
    ({ lst, dep, ...props }) =>
      ({
        ...props,
        lst: lst?.split('|') || [],
        dep: dep?.split('|') || [],
      } as IRegistryDownload),
  )

export default convertRegistryDownloads
