import React, { useState } from 'react'
import { Tab } from 'components'
import { Children, useMemo } from 'react'
import { ITab, ITabsProps } from './types'

const useBase = ({ defaultSelectedIndex = 0, children, onChange }: ITabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex)

  const tabs: ITab[] = useMemo(
    () =>
      Children.toArray(children).map((item, index) => {
        if (!React.isValidElement(item) || item.type !== Tab) {
          throw new Error('`Tabs` only accepts children of type `Tab`.')
        }

        const { label, value, onActive, onClose, children } = item.props

        const handleActive = (e: React.MouseEvent<HTMLLIElement>) => {
          e.preventDefault()
          setSelectedIndex(index)

          if (onActive) {
            onActive(index, value)
          }

          if (onChange) {
            onChange(index, value, item, e)
          }
        }

        const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
          e.preventDefault()

          if (onClose) {
            onClose(index, value)
          }
        }

        return {
          index,
          label,
          value,
          children,
          isActive: selectedIndex === index,
          onActive: handleActive,
        }
      }),
    [selectedIndex, children],
  )

  return {
    tabs,
  }
}

export default useBase
