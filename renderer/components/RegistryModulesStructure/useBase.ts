import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { prepareModulesStructure } from 'helpers/prepareModulesStructure'
import { IRegistryModulesStructureProps } from './types'

const useBase = ({ modulesStructure }: IRegistryModulesStructureProps) => {
  const defaultPreparedStructure = useMemo(() => prepareModulesStructure(modulesStructure), [modulesStructure])

  const [preparedStructure, setPreparedStructure] = useState(defaultPreparedStructure)

  const toggleModuleType = (event: MouseEvent<HTMLButtonElement>) => {
    const moduleType = event.currentTarget.dataset['type']

    setPreparedStructure((prevState) =>
      prevState.map((item) => ({ ...item, isOpen: moduleType === item.type ? !item.isOpen : item.isOpen })),
    )
  }

  const toggleModuleLang = (event: MouseEvent<HTMLButtonElement>) => {
    const moduleType = event.currentTarget.dataset['type']
    const moduleLang = event.currentTarget.dataset['lang']

    setPreparedStructure((prevState) =>
      prevState.map((module) => ({
        ...module,
        languages:
          moduleType === module.type
            ? module.languages.map((item) => ({
                ...item,
                isOpen: item.lang === moduleLang ? !item.isOpen : item.isOpen,
              }))
            : module.languages,
      })),
    )
  }

  useEffect(() => {
    setPreparedStructure(defaultPreparedStructure)
  }, [defaultPreparedStructure])

  return { preparedStructure, toggleModuleType, toggleModuleLang }
}

export default useBase
