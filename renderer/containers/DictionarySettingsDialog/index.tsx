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
      <div className="bg-white">Dictionary settings...</div>
    </Modal>
  )
}

DictionarySettingsDialog.defaultProps = {
  onCloseTabs: noop,
  onClose: noop,
}
