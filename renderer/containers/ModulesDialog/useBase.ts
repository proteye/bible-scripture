import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IRegistry } from '@common/types'
import { IModulesDialogProps } from './types'
import { prepareRegistryModules } from 'helpers/prepareRegistryModules'

const useBase = ({ isVisible }: IModulesDialogProps) => {
  const [registry, setRegistry] = useState<IRegistry>({ version: 0, hosts: [], downloads: [] })

  const preparedRegistryModules = useMemo(() => prepareRegistryModules(registry.downloads), [registry.downloads])
  console.log('preparedRegistryModules', preparedRegistryModules)

  const getRegistry = useCallback(async () => {
    const registry = await ipcRenderer.invoke('getRegistry')
    setRegistry(registry)
  }, [])

  const downloadModule = useCallback(async (moduleName: string) => {
    await ipcRenderer.invoke('downloadModule', moduleName)
  }, [])

  const handleModuleClick = useCallback(
    async (moduleName: string) => {
      downloadModule(moduleName)
    },
    [downloadModule],
  )

  useEffect(() => {
    if (!registry.version && isVisible) {
      getRegistry()
    }
  }, [registry, isVisible, getRegistry])

  return {
    preparedRegistryModules,
    handleModuleClick,
  }
}

export default useBase
