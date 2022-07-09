import React, { FC } from 'react'
import noop from 'helpers/noop'
import { DownloadIcon, TrashIcon } from '@heroicons/react/outline'
import { IRegistryModulesTableProps } from './types'
import useBase from './useBase'

const RegistryModulesTable: FC<IRegistryModulesTableProps> = (props) => {
  const { type, lang, downloadingModules, selectedModules, theadClassName, className, style, qa } = props

  const { preparedModules, handleSelect, handleSelectAll, handleDownload, handleRemove } = useBase(props)

  if (!preparedModules.length) {
    return <div className="flex justify-center w-full text-gray-500">Nothing found</div>
  }

  return (
    <div className={`flex w-full h-full pl-1 pr-3 text-sm ${className}`} style={style} data-qa={qa}>
      <table className="table-fixed w-full rounded shadow">
        <thead className={theadClassName}>
          <tr>
            <th className="w-12 text-center bg-blue-300">
              <input
                type="checkbox"
                className="rounded shadow-sm text-blue-600 focus:ring-0 focus:ring-offset-0"
                defaultChecked={false}
                data-type={type}
                data-lang={lang}
                onChange={handleSelectAll}
                readOnly
              />
            </th>
            <th className="w-12 bg-blue-300">#</th>
            <th className="px-4 bg-blue-300">Name</th>
            <th className="w-28 bg-blue-300">Last update</th>
            <th className="w-20 bg-blue-300">Size</th>
            <th className="w-24 bg-blue-300"></th>
          </tr>
        </thead>
        <tbody>
          {preparedModules.map(({ abr, des, upd, siz, exists }, index) => (
            <tr
              key={abr}
              className={`${
                exists ? 'bg-yellow-100' : 'even:bg-gray-50'
              } group border-t border-dashed first:border-none hover:bg-blue-100 cursor-default`}
              data-abr={abr}
              onClick={downloadingModules[abr] > 0 ? undefined : handleSelect}
            >
              <td className="group-last:rounded-bl">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    className="rounded shadow-sm text-blue-600 focus:ring-0 focus:ring-offset-0"
                    checked={!!selectedModules[abr]}
                    readOnly
                  />
                </div>
              </td>
              <td>{index + 1}</td>
              <td className="px-4 py-1">
                <div className="font-medium">{abr}</div>
                <div className="text-xs text-gray-500">{des}</div>
              </td>
              <td>{upd}</td>
              <td>{siz}</td>
              <td className="text-center group-last:rounded-br">
                {exists ? (
                  <button
                    className="p-1 rounded border border-transparent shadow-sm text-white bg-red-600 hover:bg-red-700 active:shadow-none active:bg-red-800 active:disabled:bg-gray-100 active:disabled:shadow-sm disabled:text-gray-400 disabled:bg-gray-100"
                    data-abr={abr}
                    onClick={handleRemove}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                ) : downloadingModules[abr] > 0 ? (
                  <span className="text-xs font-medium">
                    {downloadingModules[abr] < 100 ? `${downloadingModules[abr]}%` : 'Unpacking...'}
                  </span>
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
  downloadingModules: {},
  selectedModules: {},
  onSelect: noop,
  onDownload: noop,
  onRemove: noop,
}

export default RegistryModulesTable
