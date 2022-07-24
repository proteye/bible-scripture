import React, { FC } from 'react'
import { Modal } from 'components'

import { IDictionarySettingsDialogProps } from './types'
import noop from 'helpers/noop'
import useBase from './useBase'
import { ESelectedDictionaryType } from 'types/dictionary'

export const DictionarySettingsDialog: FC<IDictionarySettingsDialogProps> = (props) => {
  const { isVisible, onClose } = props

  const { selectedDictionaries, selectOptions, handleSelect, handleSave } = useBase(props)

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
            onClick={handleSave}
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
              <select
                defaultValue={'selected'}
                value={selectedDictionaries?.[ESelectedDictionaryType.hebrew]?.name ?? 'selected'}
                className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                data-type="hebrew"
                onChange={handleSelect}
              >
                <option disabled hidden value="selected">
                  Select dictionary...
                </option>
                {selectOptions}
              </select>
            </div>
          </li>
          <li className="grid grid-cols-1 gap-1 sm:grid-cols-5 sm:gap-4">
            <div className="sm:col-span-2 font-medium">Greek dictionary:</div>
            <div className="sm:col-span-3">
              <select
                defaultValue={'selected'}
                value={selectedDictionaries?.[ESelectedDictionaryType.greek]?.name ?? 'selected'}
                className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                data-type="greek"
                onChange={handleSelect}
              >
                <option disabled hidden value="selected">
                  Select dictionary...
                </option>
                {selectOptions}
              </select>
            </div>
          </li>
          <li className="grid grid-cols-1 gap-1 sm:grid-cols-5 sm:gap-4">
            <div className="sm:col-span-2 font-medium">Dictionary by Strong:</div>
            <div className="sm:col-span-3">
              <select
                defaultValue={'selected'}
                value={selectedDictionaries?.[ESelectedDictionaryType.strong]?.name ?? 'selected'}
                className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                data-type="strong"
                onChange={handleSelect}
              >
                <option disabled hidden value="selected">
                  Select dictionary...
                </option>
                {selectOptions}
              </select>
            </div>
          </li>
          <li className="grid grid-cols-1 gap-1 sm:grid-cols-5 sm:gap-4">
            <div className="sm:col-span-2 font-medium">Instant Details dictionary:</div>
            <div className="sm:col-span-3">
              <select
                defaultValue={'selected'}
                value={selectedDictionaries?.[ESelectedDictionaryType.instantDetails]?.name ?? 'selected'}
                className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                data-type="instantDetails"
                onChange={handleSelect}
              >
                <option disabled hidden value="selected">
                  Select dictionary...
                </option>
                {selectOptions}
              </select>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  )
}

DictionarySettingsDialog.defaultProps = {
  onClose: noop,
}
