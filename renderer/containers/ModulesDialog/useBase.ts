import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IRegistry } from '@common/types'
import { IModulesDialogProps } from './types'
import { prepareRegistryModules } from 'helpers/prepareRegistryModules'
import { TLanguagesISO6392 } from 'types/common'
import { getLanguagesISO6392 } from 'helpers/getLanguagesISO6392'

const useBase = ({ isVisible }: IModulesDialogProps) => {
  const [registry, setRegistry] = useState<IRegistry>({ version: 0, hosts: [], downloads: [] })
  const [languagesISO6392, setLanguagesISO6392] = useState<TLanguagesISO6392>({})

  const modulesStructure = useMemo(() => prepareRegistryModules(registry.downloads), [registry.downloads])

  const getRegistry = useCallback(async () => {
    const registry = await ipcRenderer.invoke('getRegistry')
    setRegistry(registry)
  }, [])

  const downloadModule = useCallback(async (moduleName: string) => {
    await ipcRenderer.invoke('downloadModule', moduleName)
  }, [])

  const uploadLanguagesISO = useCallback(async () => {
    const data: TLanguagesISO6392 = await getLanguagesISO6392()
    setLanguagesISO6392(data)
  }, [])

  const handleDownloadModule = useCallback(
    async (moduleName: string) => {
      downloadModule(moduleName)
    },
    [downloadModule],
  )

  useEffect(() => {
    if (!registry.version && isVisible) {
      uploadLanguagesISO()
      getRegistry()
    }
  }, [registry, isVisible, getRegistry])

  return {
    modulesStructure,
    languagesISO6392,
    handleDownloadModule,
  }
}

export default useBase
