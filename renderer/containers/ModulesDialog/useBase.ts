import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IRegistry } from '@common/types'
import { IModulesDialogProps } from './types'
import { prepareRegistryModules } from 'helpers/prepareRegistryModules'
import { TLanguagesISO639 } from 'types/common'
import { languagesISO639Url } from 'constants/common'

const useBase = ({ isVisible }: IModulesDialogProps) => {
  const [registry, setRegistry] = useState<IRegistry>({ version: 0, hosts: [], downloads: [] })
  const [languagesISO, setLanguagesISO] = useState<TLanguagesISO639>({})

  const modulesStructure = useMemo(() => prepareRegistryModules(registry.downloads), [registry.downloads])

  const getRegistry = useCallback(async () => {
    const registry = await ipcRenderer.invoke('getRegistry')
    setRegistry(registry)
  }, [])

  const downloadModule = useCallback(async (moduleName: string) => {
    await ipcRenderer.invoke('downloadModule', moduleName)
  }, [])

  const uploadLanguagesISO = useCallback(async () => {
    const data: TLanguagesISO639 = await fetch(languagesISO639Url).then((res) => res.json())
    setLanguagesISO(data)
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
    languagesISO,
    modulesStructure,
    handleDownloadModule,
  }
}

export default useBase
