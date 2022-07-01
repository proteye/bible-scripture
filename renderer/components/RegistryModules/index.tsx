import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IRegistryModulesProps } from './types'

const RegistryModules: FC<IRegistryModulesProps> = ({ downloads = [], className, style, qa, onClick }) => {
  return (
    <div className="flex w-full">
      <ul>
        {downloads.map(({ abr }) => (
          <li key={abr}>{abr}</li>
        ))}
      </ul>
    </div>
  )
}

RegistryModules.defaultProps = {
  onClick: noop,
}

export default RegistryModules
