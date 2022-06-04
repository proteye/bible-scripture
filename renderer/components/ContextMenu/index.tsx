import React, { FC } from 'react'
import noop from 'helpers/noop'

import { IContextMenuProps } from './types'
import { SContextMenu, SSelect } from './styled.index'
import useBase from './useBase'

const ContextMenu: FC<IContextMenuProps> = ({ label, items, onSelect }) => {
  const { handleSelect } = useBase({ onSelect })

  return (
    <SContextMenu>
      <SSelect value={label} onChange={handleSelect}>
        <option value={label} hidden>
          {label}
        </option>
        {items.map(({ title, value }, index) => (
          <option key={index} value={value}>
            {title}
          </option>
        ))}
      </SSelect>
    </SContextMenu>
  )
}

ContextMenu.defaultProps = {
  label: '',
  items: [],
  onSelect: noop,
}

export default ContextMenu
