import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IRegistry, TModulesList } from '@common/types'
import { IModulesDialogProps } from './types'
import { prepareRegistryModules } from 'helpers/prepareRegistryModules'
import { TLanguagesISO6392 } from 'types/common'
import { getLanguagesISO6392 } from 'helpers/getLanguagesISO6392'

const useBase = ({ isVisible }: IModulesDialogProps) => {
  const [registry, setRegistry] = useState<IRegistry>({ version: 0, hosts: [], downloads: [] })
  const [filteredRegistry, setFilteredRegistry] = useState<IRegistry>(registry)
  const [downloadedModules, setDownloadedModules] = useState<TModulesList>([])
  const [languagesISO6392, setLanguagesISO6392] = useState<TLanguagesISO6392>({})

  const modulesStructure = useMemo(
    () => prepareRegistryModules(filteredRegistry.downloads),
    [filteredRegistry.downloads],
  )

  const getRegistry = useCallback(async () => {
    const registry = await ipcRenderer.invoke('getRegistry')
    setRegistry(registry)
    setFilteredRegistry(registry)
  }, [])

  const getDownloadedModules = useCallback(async () => {
    const modules: TModulesList = await ipcRenderer.invoke('getModules')
    setDownloadedModules(modules)
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

  const handleFilterModules = useCallback(
    async (value: string) => {
      const filterValue = value.toLowerCase()
      setFilteredRegistry({
        ...registry,
        downloads: registry.downloads.filter(
          ({ abr, lng, aln, reg, des, lds, inf }) =>
            abr.toLowerCase().includes(filterValue) ||
            lng?.toLowerCase().includes(filterValue) ||
            aln?.toLowerCase().includes(filterValue) ||
            reg?.toLowerCase().includes(filterValue) ||
            des.toLowerCase().includes(filterValue) ||
            inf?.toLowerCase().includes(filterValue) ||
            lds?.some(({ des: ldsDes }) => ldsDes.toLowerCase().includes(filterValue)),
        ),
      })
    },
    [registry],
  )

  useEffect(() => {
    if (!registry.version && isVisible) {
      uploadLanguagesISO()
      getDownloadedModules()
      getRegistry()
    }
  }, [registry, isVisible, getRegistry])

  useEffect(() => {
    if (!isVisible) {
      setFilteredRegistry(registry)
    }
  }, [registry, isVisible])

  return {
    modulesStructure,
    downloadedModules,
    languagesISO6392,
    handleDownloadModule,
    handleFilterModules,
  }
}

export default useBase
