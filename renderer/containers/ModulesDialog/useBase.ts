import { useCallback, useEffect, useMemo, useState } from 'react'
import { ipcRenderer } from 'electron'
import { IRegistry, TModulesList } from '@common/types'
import { IModulesDialogProps } from './types'
import { prepareRegistryModules } from 'helpers/prepareRegistryModules'
import { TLanguagesISO6392 } from 'types/common'
import { getLanguagesISO6392 } from 'helpers/getLanguagesISO6392'
import { TSelectedModules } from 'components/RegistryModulesTable/types'
import { getModuleType } from 'helpers/getModuleType'

const useBase = ({ isVisible, onCloseTabs }: IModulesDialogProps) => {
  const [registry, setRegistry] = useState<IRegistry>({ version: 0, hosts: [], downloads: [] })
  const [filteredRegistry, setFilteredRegistry] = useState<IRegistry>(registry)
  const [downloadedModules, setDownloadedModules] = useState<TModulesList>([])
  const [languagesISO6392, setLanguagesISO6392] = useState<TLanguagesISO6392>({})
  const [selectedModules, setSelectedModules] = useState<TSelectedModules>({})

  const modulesStructure = useMemo(
    () => prepareRegistryModules(filteredRegistry.downloads),
    [filteredRegistry.downloads],
  )
  const downloadedModulesMap = useMemo(
    () => downloadedModules.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {}),
    [downloadedModules],
  )

  const selectedModuleNames = useMemo(
    () => Object.keys(selectedModules).filter((key) => selectedModules[key]),
    [selectedModules],
  )

  const selectedDownloadModules = useMemo(
    () => Object.keys(selectedModules).filter((key) => selectedModules[key] && !downloadedModulesMap[key]),
    [selectedModules, downloadedModulesMap],
  )

  const isModulesSelected = selectedModuleNames.length > 0
  const isOnlyDeletableModules =
    isModulesSelected && selectedModuleNames.every((moduleName) => downloadedModulesMap[moduleName])

  const getRegistry = useCallback(async () => {
    const registry = await ipcRenderer.invoke('getRegistry')
    setRegistry(registry)
    setFilteredRegistry(registry)
  }, [])

  const getDownloadedModules = useCallback(async () => {
    const modules: TModulesList = await ipcRenderer.invoke('getModules')
    setDownloadedModules(modules)
  }, [])

  const downloadModule = useCallback(
    async (moduleName: string) => {
      await ipcRenderer.invoke('downloadModule', moduleName)
      getDownloadedModules()
    },
    [getDownloadedModules],
  )

  const removeModule = useCallback(
    async (moduleName: string) => {
      await ipcRenderer.invoke('removeModule', moduleName)
      getDownloadedModules()
    },
    [getDownloadedModules],
  )

  const downloadLanguagesISO = useCallback(async () => {
    const data: TLanguagesISO6392 = await getLanguagesISO6392()
    setLanguagesISO6392(data)
  }, [getLanguagesISO6392])

  const handleSelectModule = (moduleName: string) => {
    setSelectedModules((prevState) => ({ ...prevState, [moduleName]: !prevState[moduleName] }))
  }

  const handleSelectModules = (type: string, lang: string, isSelected: boolean) => {
    const selectedModules = filteredRegistry.downloads
      .filter(({ lng, fil }) => type === getModuleType(fil) && lang === lng)
      .map(({ abr }) => abr)
      .reduce((prev, curr) => ({ ...prev, [curr]: isSelected }), {})
    setSelectedModules((prevState) => ({ ...prevState, ...selectedModules }))
  }

  const handleDownloadModule = useCallback(
    async (moduleName: string) => {
      downloadModule(moduleName)
    },
    [downloadModule],
  )

  const handleRemoveModule = useCallback(
    async (moduleName: string) => {
      removeModule(moduleName)
      onCloseTabs(moduleName)
    },
    [removeModule, onCloseTabs],
  )

  const handleFilterModules = useCallback(
    async (value: string) => {
      const filterValue = value.trim().toLowerCase()
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

  const handleDownload = useCallback(() => {
    selectedDownloadModules.forEach((moduleName) => downloadModule(moduleName))
    setSelectedModules({})
  }, [selectedDownloadModules, downloadModule])

  const handleRemove = useCallback(() => {
    if (!isOnlyDeletableModules) {
      return
    }

    Object.keys(selectedModules)
      .filter((key) => selectedModules[key])
      .forEach((moduleName) => {
        removeModule(moduleName)
        onCloseTabs(moduleName)
      })
    setSelectedModules({})
  }, [selectedModules, isOnlyDeletableModules, removeModule, onCloseTabs])

  useEffect(() => {
    if (isVisible) {
      if (!registry.version) {
        downloadLanguagesISO()
        getRegistry()
      }
      getDownloadedModules()
    }
  }, [registry, isVisible, getRegistry])

  useEffect(() => {
    if (!isVisible) {
      setFilteredRegistry(registry)
      setSelectedModules({})
    }
  }, [registry, isVisible])

  return {
    modulesStructure,
    downloadedModules,
    languagesISO6392,
    selectedModules,
    downloadCount: selectedDownloadModules.length,
    removeCount: selectedModuleNames.length,
    isModulesSelected,
    isOnlyDeletableModules,
    handleSelectModule,
    handleSelectModules,
    handleDownloadModule,
    handleRemoveModule,
    handleFilterModules,
    handleDownload,
    handleRemove,
  }
}

export default useBase
