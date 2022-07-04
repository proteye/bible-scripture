import { MouseEvent, useState } from 'react'
import { IRegistryModulesStructureProps } from './types'

const useBase = ({ modulesStructure }: IRegistryModulesStructureProps) => {
  const defaultModuleTypesKeys = Object.keys(modulesStructure).map((type) => ({
    type,
    label: type[0].toUpperCase() + type.substring(1),
    isClosed: true,
  }))

  const [moduleTypeKeys, setModuleTypeKeys] = useState(defaultModuleTypesKeys)

  const toggleModuleType = (event: MouseEvent<HTMLButtonElement>) => {
    const moduleType = event.currentTarget.dataset['type']
    setModuleTypeKeys((prevState) =>
      prevState.map((item) => ({ ...item, isClosed: moduleType === item.type ? !item.isClosed : item.isClosed })),
    )
  }

  return { moduleTypeKeys, toggleModuleType }
}

export default useBase
