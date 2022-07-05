import React, { FC } from 'react'
import { Modal, RegistryModulesStructure } from 'components'

import { IModulesDialogProps } from './types'
import noop from 'helpers/noop'
import useBase from './useBase'

export const ModulesDialog: FC<IModulesDialogProps> = (props) => {
  const { isVisible, onClose } = props

  const { modulesStructure, languagesISO6392, handleDownloadModule } = useBase(props)

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="bg-white px-4 py-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <RegistryModulesStructure
            modulesStructure={modulesStructure}
            languagesISO6392={languagesISO6392}
            onDownload={handleDownloadModule}
          />
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 active:outline-none active:ring-2 active:ring-offset-2 active:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Download
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none active:ring-2 active:ring-offset-2 active:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

ModulesDialog.defaultProps = {
  onClose: noop,
}
