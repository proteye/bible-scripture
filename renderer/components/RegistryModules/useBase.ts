import { MouseEvent } from 'react'
import { IRegistryModulesProps } from './types'

const useBase = ({ onItemClick }: IRegistryModulesProps) => {
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    const moduleName = event.currentTarget.dataset['abr']
    onItemClick(moduleName)
  }

  return { handleClick }
}

export default useBase
