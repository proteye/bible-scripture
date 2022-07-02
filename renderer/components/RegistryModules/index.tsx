import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IRegistryModulesProps } from './types'
import useBase from './useBase'

const RegistryModules: FC<IRegistryModulesProps> = (props) => {
  const { downloads = [], className, style, qa } = props

  const { handleClick } = useBase(props)

  return (
    <div className={`flex w-full h-96 overflow-y-scroll ${className}`} style={style} data-qa={qa}>
      <table className="table-fixed w-full">
        <thead className="sticky top-0">
          <tr>
            <th className="px-4 bg-blue-300">Name</th>
            <th className="px-4 bg-blue-300">Last update</th>
            <th className="px-4 bg-blue-300">Size</th>
          </tr>
        </thead>
        <tbody>
          {downloads.map(({ abr, upd, siz }) => (
            <tr key={abr} data-abr={abr} className="hover:bg-blue-100 cursor-default" onClick={handleClick}>
              <td className="px-4">{abr}</td>
              <td className="px-4">{upd}</td>
              <td className="px-4">{siz}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

RegistryModules.defaultProps = {
  onItemClick: noop,
}

export default RegistryModules
