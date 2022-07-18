import React, { FC } from 'react'
import { Modal } from 'components'

import { IDictionarySettingsDialogProps } from './types'
import noop from 'helpers/noop'
import useBase from './useBase'

export const DictionarySettingsDialog: FC<IDictionarySettingsDialogProps> = (props) => {
  const { isVisible, onClose } = props

  const { result } = useBase(props)

  return (
    <Modal
      title="Dictionary Settings"
      isVisible={isVisible}
      onClose={onClose}
      footer={
        <div className="sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className={`w-full inline-flex justify-center px-4 py-2 rounded border border-transparent shadow bg-blue-600 text-base font-medium text-white hover:bg-blue-700 active:shadow-sm active:bg-blue-800 active:disabled:bg-blue-400 active:disabled:shadow disabled:text-gray-50 disabled:bg-blue-400 sm:ml-3 sm:w-auto sm:text-sm`}
          >
            Save
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center px-4 py-2 mt-3 rounded border border-gray-300 shadow bg-white text-base font-medium text-gray-700 hover:bg-gray-50 active:shadow-sm active:bg-gray-100 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="p-4 sm:px-6 bg-white">
        <ul className="flex flex-col space-y-6 sm:space-y-4">
          <li className="grid grid-cols-1 gap-1 sm:grid-cols-5 sm:gap-4">
            <div className="sm:col-span-2 font-medium">Hebrew dictionary:</div>
            <div className="sm:col-span-3">
              <select className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option disabled selected hidden>
                  Select dictionary...
                </option>
                <option>Halot</option>
                <option>BDAG3</option>
              </select>
            </div>
          </li>
          <li className="grid grid-cols-1 gap-1 sm:grid-cols-5 sm:gap-4">
            <div className="sm:col-span-2 font-medium">Greek dictionary:</div>
            <div className="sm:col-span-3">
              <select className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option disabled selected hidden>
                  Select dictionary...
                </option>
                <option>Halot</option>
                <option>BDAG3</option>
              </select>
            </div>
          </li>
          <li className="grid grid-cols-1 gap-1 sm:grid-cols-5 sm:gap-4">
            <div className="sm:col-span-2 font-medium">Dictionary by Strong:</div>
            <div className="sm:col-span-3">
              <select className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option disabled selected hidden>
                  Select dictionary...
                </option>
                <option>Журом</option>
                <option>Стронг</option>
              </select>
            </div>
          </li>
          <li className="grid grid-cols-1 gap-1 sm:grid-cols-5 sm:gap-4">
            <div className="sm:col-span-2 font-medium">Instant Details dictionary:</div>
            <div className="sm:col-span-3">
              <select className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option disabled selected hidden>
                  Select dictionary...
                </option>
                <option>Журом</option>
                <option>Стронг</option>
                <option>Halot</option>
                <option>BDAG3</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  )
}

DictionarySettingsDialog.defaultProps = {
  onCloseTabs: noop,
  onClose: noop,
}
