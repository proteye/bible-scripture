import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { prepareModulesStructure } from 'helpers/prepareModulesStructure'
import { IRegistryModulesStructureProps, TModuleTypeOpen } from './types'

const useBase = ({ modulesStructure, languagesISO6392 }: IRegistryModulesStructureProps) => {
  const defaultPreparedStructure = useMemo(
    () => prepareModulesStructure(modulesStructure, languagesISO6392),
    [modulesStructure, languagesISO6392],
  )

  const [preparedStructure, setPreparedStructure] = useState(defaultPreparedStructure)
  const [structureOpened, setStructureOpened] = useState({} as TModuleTypeOpen)

  const isEmpty = useMemo(() => preparedStructure.every(({ languages }) => !languages.length), [preparedStructure])

  const modulesCounts = useMemo(() => {
    if (isEmpty) {
      return {}
    }

    const counts = {}

    Object.keys(modulesStructure).forEach((type) => {
      const count = Object.keys(modulesStructure[type]).reduce(
        (prev, curr) => prev + (modulesStructure[type][curr]?.length ?? 0),
        0,
      )
      counts[type] = count
    })

    return counts
  }, [isEmpty, modulesStructure])

  const toggleModuleType = (event: MouseEvent<HTMLButtonElement>) => {
    const moduleType = event.currentTarget.dataset['type']

    setStructureOpened((prevState) => ({
      ...prevState,
      [moduleType]: { ...prevState[moduleType], isOpen: !prevState[moduleType]?.isOpen },
    }))
  }

  const toggleModuleLang = (event: MouseEvent<HTMLButtonElement>) => {
    const moduleType = event.currentTarget.dataset['type']
    const moduleLang = event.currentTarget.dataset['lang']

    setStructureOpened((prevState) => ({
      ...prevState,
      [moduleType]: {
        ...prevState[moduleType],
        languages: {
          ...prevState[moduleType]?.languages,
          [moduleLang]: {
            ...prevState[moduleType]?.languages?.[moduleLang],
            isOpen: !prevState[moduleType]?.languages?.[moduleLang]?.isOpen,
          },
        },
      },
    }))
  }

  useEffect(() => {
    setPreparedStructure(defaultPreparedStructure)
  }, [defaultPreparedStructure])

  return { preparedStructure, structureOpened, modulesCounts, isEmpty, toggleModuleType, toggleModuleLang }
}

export default useBase
