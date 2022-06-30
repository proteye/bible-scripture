import { IRegistryDownload, IRegistryDownloadJson } from "common/types";

export const convertRegistryDownloads = (downloads: IRegistryDownloadJson[]) => downloads.map(({lst, dep, ...props}) => ({
    ...props,
    lst: lst?.split('|') || [],
    dep: dep?.split('|') || [],
} as IRegistryDownload))
