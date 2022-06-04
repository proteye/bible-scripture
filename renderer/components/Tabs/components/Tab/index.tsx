import React, { FC } from 'react'
import { ITab } from '../../types'
import { ETabType } from 'components/Tab/types'
import { XIcon } from '@heroicons/react/outline'

const Tab: FC<ITab> = ({ index, label, type, isActive, children, onActive, onClose }) => {
  const isTabActive = type === ETabType.tab && isActive

  return (
    <li className={`group relative inline-flex items-center ${isTabActive && 'border-b-2 border-gray-400'}`} data-index={index} onClick={onActive}>
      {type === ETabType.tab ? <>
        <a className={`flex h-8 leading-8 px-8 whitespace-nowrap uppercase font-semibold text-xs ${isTabActive ? 'text-blue-700' : 'text-gray-700'} cursor-default select-none`}>{label}</a>
        <span className='absolute hidden right-0 top-1/2 w-4 h-4 rounded -translate-y-1/2 group-hover:flex hover:bg-gray-300' onClick={onClose}>
          <XIcon id="close" className="h-4 w-4 text-gray-600" />
        </span>
      </> : children}
    </li>
  )
}

export default Tab
