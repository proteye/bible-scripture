import React, { FC } from 'react'
import noop from 'helpers/noop'
import { XCircleIcon, XIcon } from '@heroicons/react/outline'

import Portal from '../Portal'
import { IModalProps } from './types'

const Modal: FC<IModalProps> = ({ isVisible, title, isShowClose, isClickableBackdrop, children, footer, onClose }) => {
  if (!isVisible) {
    return null
  }

  return (
    <Portal>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed inset-0" onClick={isClickableBackdrop ? onClose : undefined}></div>
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-0 text-center">
            <div className="relative w-full sm:my-8 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
              <header className="relative flex items-center justify-center h-8 bg-slate-200">
                {title && <span className="text-md font-bold">{title}</span>}
                {isShowClose && (
                  <button
                    className="group absolute right-2 rounded hover:bg-red-300 hover:shadow active:shadow-sm"
                    onClick={onClose}
                  >
                    <XIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  </button>
                )}
              </header>
              <main>{children}</main>
              {footer && <footer className="bg-gray-100 px-4 py-3 border-t border-gray-200 sm:px-6">{footer}</footer>}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

Modal.defaultProps = {
  title: '',
  isShowClose: true,
  isClickableBackdrop: false,
  className: '',
  onClose: noop,
}

export default Modal
