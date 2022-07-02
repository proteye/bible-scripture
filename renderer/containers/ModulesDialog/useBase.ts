import { useCallback, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IRegistry } from '@common/types'
import { IModulesDialogProps } from './types'

const useBase = ({ isVisible }: IModulesDialogProps) => {
  const [registry, setRegistry] = useState<IRegistry>(null)

  const getRegistry = useCallback(async () => {
    const registry = await ipcRenderer.invoke('getRegistry')
    setRegistry(registry)
  }, [])

  const downloadModule = useCallback(async (moduleName: string) => {
    await ipcRenderer.invoke('downloadModule', moduleName)
  }, [])

  const handleModuleClick = useCallback(
    async (moduleName: string) => {
      console.log('moduleName', moduleName)
      downloadModule(moduleName)
    },
    [downloadModule],
  )

  useEffect(() => {
    if (!registry && isVisible) {
      getRegistry()
    }
  }, [registry, isVisible, getRegistry])

  return {
    registry,
    handleModuleClick,
  }
}

export default useBase
