import React, { FC } from 'react'
import noop from 'helpers/noop'
import { DownloadIcon } from '@heroicons/react/outline'
import { IRegistryModulesProps } from './types'
import useBase from './useBase'

const RegistryModules: FC<IRegistryModulesProps> = (props) => {
  const { modules, className, style, qa } = props

  const { handleClick } = useBase(props)

  return (
    <div className={`flex w-full h-96 overflow-y-scroll ${className}`} style={style} data-qa={qa}>
      <table className="table-fixed w-full">
        <thead className="sticky top-0">
          <tr>
            <th className="px-4 bg-blue-300">Name</th>
            <th className="px-4 bg-blue-300">Last update</th>
            <th className="px-4 bg-blue-300">Size</th>
            <th className="w-10 bg-blue-300"></th>
          </tr>
        </thead>
        <tbody>
          {modules.bible.ru?.map(({ abr, upd, siz }) => (
            <tr key={abr} className="hover:bg-blue-100 cursor-default">
              <td className="px-4">{abr}</td>
              <td className="px-4">{upd}</td>
              <td className="px-4">{siz}</td>
              <td className="flex justify-center">
                <button
                  className="text-gray-600 hover:text-blue-600 active:text-blue-800"
                  data-abr={abr}
                  onClick={handleClick}
                >
                  <DownloadIcon className="w-6 h-6" />
                </button>
              </td>
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
