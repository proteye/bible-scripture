import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IContextMenuProps } from './types'
import useBase from './useBase'

const ContextMenu: FC<IContextMenuProps> = ({ label, items, onSelect }) => {
  const { handleSelect } = useBase({ onSelect })

  return (
    <div className="block px-4">
      <select
        className="block w-full bg-transparent border-none appearance-none outline-none select-none focus:outline-none focus:ring-0"
        value={label}
        onChange={handleSelect}
      >
        <option value={label} hidden>
          {label}
        </option>
        {items.map(({ title, value }, index) => (
          <option key={index} value={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  )
}

ContextMenu.defaultProps = {
  label: '',
  items: [],
  onSelect: noop,
}

export default ContextMenu
