import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IRegistryModulesProps } from './types'
import useBase from './useBase'

const RegistryModules: FC<IRegistryModulesProps> = (props) => {
  const { downloads = [], className, style, qa } = props

  const { handleClick } = useBase(props)

  return (
    <div className={`flex w-full ${className}`} style={style} data-qa={qa}>
      <ul>
        {downloads.map(({ abr }) => (
          <li key={abr} data-abr={abr} onClick={handleClick}>
            {abr}
          </li>
        ))}
      </ul>
    </div>
  )
}

RegistryModules.defaultProps = {
  onItemClick: noop,
}

export default RegistryModules
