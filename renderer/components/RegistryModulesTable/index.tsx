import React, { FC } from 'react'
import noop from 'helpers/noop'
import { DownloadIcon } from '@heroicons/react/outline'
import { IRegistryModulesTableProps } from './types'
import useBase from './useBase'

const RegistryModulesTable: FC<IRegistryModulesTableProps> = (props) => {
  const { theadClassName, className, style, qa } = props

  const { preparedModules, handleDownload } = useBase(props)

  if (!preparedModules.length) {
    return <div className="flex justify-center w-full text-gray-500">Nothing found</div>
  }

  return (
    <div className={`flex w-full h-full ${className}`} style={style} data-qa={qa}>
      <table className="table-fixed w-full">
        <thead className={theadClassName}>
          <tr>
            <th className="px-4 bg-blue-300">#</th>
            <th className="px-4 bg-blue-300">Name</th>
            <th className="px-4 bg-blue-300">Last update</th>
            <th className="px-4 bg-blue-300">Size</th>
            <th className="w-10 bg-blue-300"></th>
          </tr>
        </thead>
        <tbody>
          {preparedModules.map(({ abr, upd, siz, exists }, index) => (
            <tr key={abr} className={`${exists && 'bg-yellow-100'} hover:bg-blue-100 cursor-default`}>
              <td className="px-4">{index + 1}</td>
              <td className="px-4">{abr}</td>
              <td className="px-4">{upd}</td>
              <td className="px-4">{siz}</td>
              <td className="flex justify-center">
                <button
                  className="text-gray-600 hover:text-blue-600 active:text-blue-800 disabled:text-gray-400"
                  data-abr={abr}
                  disabled={exists}
                  onClick={handleDownload}
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

RegistryModulesTable.defaultProps = {
  className: '',
  theadClassName: '',
  downloadedModules: [],
  onDownload: noop,
}

export default RegistryModulesTable
