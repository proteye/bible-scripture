import React, { FC } from 'react'
import noop from 'helpers/noop'
import { DownloadIcon, TrashIcon } from '@heroicons/react/outline'
import { IRegistryModulesTableProps } from './types'
import useBase from './useBase'

const RegistryModulesTable: FC<IRegistryModulesTableProps> = (props) => {
  const { selectedModules, theadClassName, className, style, qa } = props

  const { preparedModules, handleDownload, handleSelect } = useBase(props)

  if (!preparedModules.length) {
    return <div className="flex justify-center w-full text-gray-500">Nothing found</div>
  }

  return (
    <div className={`flex w-full h-full pr-3 text-sm ${className}`} style={style} data-qa={qa}>
      <table className="table-fixed w-full">
        <thead className={theadClassName}>
          <tr>
            <th className="w-12 bg-blue-300"></th>
            <th className="w-12 bg-blue-300">#</th>
            <th className="px-4 bg-blue-300">Name</th>
            <th className="w-28 bg-blue-300">Last update</th>
            <th className="w-20 bg-blue-300">Size</th>
            <th className="w-12 bg-blue-300"></th>
          </tr>
        </thead>
        <tbody>
          {preparedModules.map(({ abr, des, upd, siz, exists }, index) => (
            <tr
              key={abr}
              className={`${exists && 'bg-yellow-100'} hover:bg-blue-100 cursor-default`}
              data-abr={abr}
              onClick={handleSelect}
            >
              <td>
                <div className="flex justify-center">
                  <input type="checkbox" className="rounded text-blue-500" checked={selectedModules[abr]} />
                </div>
              </td>
              <td>{index + 1}</td>
              <td className="px-4 py-1">
                <div className="font-medium">{abr}</div>
                <div className="text-xs text-gray-500">{des}</div>
              </td>
              <td>{upd}</td>
              <td>{siz}</td>
              <td className="text-center">
                {exists ? (
                  <button
                    className="p-1 rounded border border-transparent shadow-sm text-white bg-red-600 hover:bg-red-700 active:shadow-none active:bg-red-800 active:disabled:bg-gray-100 active:disabled:shadow-sm disabled:text-gray-400 disabled:bg-gray-100"
                    data-abr={abr}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    className="p-1 rounded border border-gray-300 shadow-sm text-gray-600 bg-white hover:bg-gray-50 active:shadow-none active:bg-gray-100 active:disabled:bg-gray-100 active:disabled:shadow-sm disabled:text-gray-400 disabled:bg-gray-100"
                    data-abr={abr}
                    onClick={handleDownload}
                  >
                    <DownloadIcon className="w-5 h-5" />
                  </button>
                )}
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
  selectedModules: {},
  onSelect: noop,
  onDownload: noop,
}

export default RegistryModulesTable
