import React, { FC } from 'react'
import noop from 'helpers/noop'

import Portal from '../Portal'
import { IModalProps } from './types'

const Modal: FC<IModalProps> = ({ children, isVisible, onClose }) => {
  if (!isVisible) {
    return null
  }

  return (
    <Portal>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed inset-0" onClick={onClose}></div>
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

Modal.defaultProps = {
  title: '',
  onClose: noop,
}

export default Modal
