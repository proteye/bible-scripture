import { MouseEvent, useMemo, useState } from 'react'
import { IModuleInfo } from '@common/types'
import convertBytes from 'helpers/convertBytes'
import convertRegistrySize from 'helpers/convertRegistrySize'
import { IPreparedRegistryDownload, IRegistryModulesTableProps, TSelectedState } from './types'

const useBase = ({ modules = [], downloadedModules, onDownload }: IRegistryModulesTableProps) => {
  const [selected, setSelected] = useState<TSelectedState>({})

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
    setSelected((prevState) => ({ ...prevState, [moduleName]: !prevState[moduleName] }))
  }

  return { preparedModules, selected, handleDownload, handleSelect }
}

export default useBase
