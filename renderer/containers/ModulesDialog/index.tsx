import React, { FC } from 'react'
import { InputSearch, Modal, RegistryModulesStructure } from 'components'

import { IModulesDialogProps } from './types'
import noop from 'helpers/noop'
import useBase from './useBase'

export const ModulesDialog: FC<IModulesDialogProps> = (props) => {
  const { isVisible, onClose } = props

  const {
    modulesStructure,
    downloadedModules,
    downloadingModules,
    languagesISO6392,
    selectedModules,
    downloadCount,
    removeCount,
    isModulesSelected,
    isOnlyDeletableModules,
    handleSelectModule,
    handleSelectModules,
    handleDownloadModule,
    handleRemoveModule,
    handleFilterModules,
    handleDownload,
    handleRemove,
  } = useBase(props)

  return (
    <Modal
      title="Modules"
      isVisible={isVisible}
      onClose={onClose}
      footer={
        <div className="sm:flex sm:flex-row-reverse">
          {isOnlyDeletableModules ? (
            <button
              type="button"
              className={`w-full inline-flex justify-center px-4 py-2 rounded border border-transparent shadow bg-red-600 text-base font-medium text-white hover:bg-red-700 active:shadow-sm active:bg-red-800 active:disabled:bg-red-400 active:disabled:shadow disabled:text-gray-50 disabled:bg-red-400 sm:ml-3 sm:w-auto sm:text-sm`}
              disabled={!isModulesSelected}
              onClick={handleRemove}
            >
              Delete {removeCount > 0 ? `(${removeCount})` : ''}
            </button>
          ) : (
            <button
              type="button"
              className={`w-full inline-flex justify-center px-4 py-2 rounded border border-transparent shadow bg-blue-600 text-base font-medium text-white hover:bg-blue-700 active:shadow-sm active:bg-blue-800 active:disabled:bg-blue-400 active:disabled:shadow disabled:text-gray-50 disabled:bg-blue-400 sm:ml-3 sm:w-auto sm:text-sm`}
              disabled={!isModulesSelected}
              onClick={handleDownload}
            >
              Download {downloadCount > 0 ? `(${downloadCount})` : ''}
            </button>
          )}
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
      <div className="bg-white">
        <div className="flex flex-shrink-0 w-full h-12 py-2 px-3 bg-blue-300">
          <InputSearch placeholder="Filter modules..." onChange={handleFilterModules} />
        </div>
        <div className="px-4 pt-2 sm:flex sm:items-start sm:px-6">
          <RegistryModulesStructure
            modulesStructure={modulesStructure}
            downloadedModules={downloadedModules}
            downloadingModules={downloadingModules}
            selectedModules={selectedModules}
            languagesISO6392={languagesISO6392}
            onSelect={handleSelectModule}
            onSelectAll={handleSelectModules}
            onDownload={handleDownloadModule}
            onRemove={handleRemoveModule}
          />
        </div>
      </div>
    </Modal>
  )
}

ModulesDialog.defaultProps = {
  onCloseTabs: noop,
  onClose: noop,
}
