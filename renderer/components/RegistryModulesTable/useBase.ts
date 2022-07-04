import { MouseEvent } from 'react'
import { IRegistryModulesTableProps } from './types'

const useBase = ({ onDownload }: IRegistryModulesTableProps) => {
  const handleDownload = (event: MouseEvent<HTMLButtonElement>) => {
    const moduleName = event.currentTarget.dataset['abr']
    onDownload(moduleName)
  }

  return { handleDownload }
}

export default useBase
