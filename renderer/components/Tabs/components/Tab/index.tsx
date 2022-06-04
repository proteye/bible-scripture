import React, { FC } from 'react'
import { ITab } from '../../types'
import { ETabType } from 'components/Tab/types'
import { XIcon } from '@heroicons/react/outline'

const Tab: FC<ITab> = ({ index, label, type, isActive, children, onActive, onClose }) => {
  return (
    <li data-index={index} $isActive={type === ETabType.tab && isActive} onClick={onActive}>
      {type === ETabType.tab ? <>
        <div>{label}</div>
        <span onClick={onClose}>
          <XIcon id="close" className="h-6 w-6" />
        </span>
      </> : children}
    </li>
  )
}

export default Tab
