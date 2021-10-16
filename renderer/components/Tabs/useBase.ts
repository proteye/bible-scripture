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

        const { label, value, onActive, children } = item.props

        const handleTab = (e: React.MouseEvent<HTMLLIElement>) => {
          e.preventDefault()
          const index = Number(e.currentTarget.dataset['index'])
          setSelectedIndex(index)

          if (onActive) {
            onActive(index)
          }

          if (onChange) {
            onChange(index, value, item, e)
          }
        }

        return {
          index,
          label,
          value,
          children,
          isActive: selectedIndex === index,
          onTab: handleTab,
        }
      }),
    [selectedIndex, children],
  )

  return {
    tabs,
  }
}

export default useBase
