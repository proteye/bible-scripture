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

  useEffect(() => {
    if (!registry && isVisible) {
      getRegistry()
    }
  }, [registry, isVisible, getRegistry])

  return {
    registry,
  }
}

export default useBase
