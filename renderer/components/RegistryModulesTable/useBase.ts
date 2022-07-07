import { MouseEvent, useMemo } from 'react'
import { IModuleInfo } from '@common/types'
import convertBytes from 'helpers/convertBytes'
import convertRegistrySize from 'helpers/convertRegistrySize'
import { IPreparedRegistryDownload, IRegistryModulesTableProps } from './types'

const useBase = ({ modules = [], downloadedModules, onSelect, onDownload }: IRegistryModulesTableProps) => {
  const preparedModules: IPreparedRegistryDownload[] = useMemo(() => {
    if (!downloadedModules?.length) {
      return modules
    }

    const downloadedModulesMap = downloadedModules.reduce(
      (prev, curr) => ({ ...prev, [curr.id]: curr }),
      {} as IModuleInfo,
    )

    return modules.map((item) =>
      downloadedModulesMap[item.abr]
        ? { ...item, siz: convertBytes(downloadedModulesMap[item.abr].size), exists: true }
        : { ...item, siz: convertRegistrySize(item.siz) },
    )
  }, [modules, downloadedModules])

  const handleDownload = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const moduleName = event.currentTarget.dataset['abr']
    onDownload(moduleName)
  }

  const handleSelect = (event: MouseEvent<HTMLTableRowElement>) => {
    const moduleName = event.currentTarget.dataset['abr']
    onSelect(moduleName)
  }

  return { preparedModules, handleDownload, handleSelect }
}

export default useBase
