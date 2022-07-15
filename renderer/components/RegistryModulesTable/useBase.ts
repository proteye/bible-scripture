import { ChangeEvent, MouseEvent, useMemo } from 'react'
import { IModuleInfo } from '@common/types'
import convertBytes from 'helpers/convertBytes'
import convertRegistrySize from 'helpers/convertRegistrySize'
import { IPreparedRegistryDownload, IRegistryModulesTableProps } from './types'

const useBase = ({
  modules = [],
  downloadedModules,
  onSelect,
  onSelectAll,
  onDownload,
  onRemove,
}: IRegistryModulesTableProps) => {
  const preparedModules: IPreparedRegistryDownload[] = useMemo(() => {
    if (!downloadedModules?.length) {
      return modules
    }

    const downloadedModulesMap = downloadedModules.reduce(
      (prev, curr) => ({ ...prev, [curr.name]: curr }),
      {} as IModuleInfo,
    )

    return modules.map((item) =>
      downloadedModulesMap[item.abr]
        ? { ...item, siz: convertBytes(downloadedModulesMap[item.abr].size), exists: true }
        : { ...item, siz: convertRegistrySize(item.siz) },
    )
  }, [modules, downloadedModules])

  const handleSelect = (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLTableRowElement>) => {
    const moduleName = event.currentTarget.dataset['abr']
    onSelect(moduleName)
  }

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.currentTarget.dataset['type']
    const lang = event.currentTarget.dataset['lang']
    const isChecked = event.currentTarget.checked
    onSelectAll(type, lang, isChecked)
  }

  const handleDownload = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const moduleName = event.currentTarget.dataset['abr']
    onDownload(moduleName)
  }

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const moduleName = event.currentTarget.dataset['abr']
    onRemove(moduleName)
  }

  return { preparedModules, handleSelect, handleSelectAll, handleDownload, handleRemove }
}

export default useBase
